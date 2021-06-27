const { json } = require('body-parser')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const User = require('../models/User')


const getUserFromToken = async (token) => {
    token = token.split(' ')[1]
    const { id: userId } = jwt.verify(token, secret)
    if (!userId) {
        throw error
    }
    return await User.findById(userId)
}
module.exports = {
    getUserFromToken
}