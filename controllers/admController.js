const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const { deletePost } = require('./postController')


class admController {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            return res.status(201).json(users)
        } catch(e) {
            return res.status(400).json({ message: `Непредвиденная ошибка: ${e}`})
        }
    }
    async banUser(req, res) {
        try {
            const id = req.params['id']
            const banned = req.body
            const user = await User.findByIdAndUpdate(id, banned, { new: true })
            if (user.banned == true) {
                return res.status(500).json({ message: `Пользователь ${user.username} забанен!` })
            } else {
                return res.status(500).json({ message: `Пользователь ${user.username} разбанен!` })
            }
        } catch (e) {
            return res.status(400).json({ message: `Непредвиденная ошибка: ${e}` })
        }
    }
    async deletePost(req, res) {
        try {
            const id = req.params['id']
            const post = await Post.findByIdAndDelete(id)
            return res.status(201).json({ message: 'Пост успешно удален!'})
        } catch(e) {
            return res.status(400).json({ message: `Непредвиденная ошибка: ${e}`})
        }
    }
    async deleteComment(req, res) {
        try {
            const id = req.params['id']
            const post = await Comment.findByIdAndDelete(id)
            return res.status(201).json({ message: 'Комментарий удален!'})
        } catch(e) {
            return res.status(400).json({ message: `Непредвиденная ошибка: ${e}`})
        }
    }
}

module.exports = new admController()