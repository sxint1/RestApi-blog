const jwt = require('jsonwebtoken')
const {secret} = require('../config')
const User = require('../models/User')

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {

    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({ message: 'Пользователь не авторизован' })    
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        const id = decodedData.id
        const user = await User.findById(id)
        if (user.banned == true) {
            return res.status(403).json({ message: 'Вы забанены!'})
        }
        next()
    } catch(e) {
        console.log(e)
        return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
}