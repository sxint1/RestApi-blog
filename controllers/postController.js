const Post = require('../models/Post')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')
const { getUserFromToken } = require('../utils/getUserFromToken')
const multer = require('multer')
const path = require('path')

class postController {
    async getPosts(req, res) {
        try {
            const posts = await Post.find()
            return res.status(201).json(posts)
        } catch (e) {
            return res.status(400).json({ message: 'Непредвиденная ошибка!' })
        }
    }
    async getMyPosts(req, res) {

        try {
            const user = await getUserFromToken(req.headers.authorization)
            const posts = await Post.find({ postAuthor: user.username })
            if (!posts) {
                return res.json({ message: 'У вас нет постов' })
            } else {
                return res.status(201).json(posts)
            }
        } catch (e) {
            return res.status(500).json({ message: 'External error' + error.message })
        }
    }
    async newPost(req, res) {
        try {
            const user = await getUserFromToken(req.headers.authorization)
            console.log(user)
            const post = new Post({
                postAuthor: user.username,
                content: req.body.content,
                fileName: fileName
            })
            await post.save()
            return res.json({ message: 'Пост успешно опубликован!' })
        } catch (e) {
            return res.status(400).json({ message: `Непредвиденная ошибка: ${error}` })
        }
    }
    async editPost(req, res) {
        const id = req.params['id']
        const post = await Post.findById(id)
        const user = getUserFromToken(req.headers.authorization)
        if (user.username == post.postAuthor) {
            if (!post.content) {
                return res.status(404).json({ message: 'Такого поста не существует!' })
            }
            try {
                const content = req.body
                const updatedPost = await Post.findByIdAndUpdate(id, content, { new: true })
                return res.status(500).json({ message: `Пост успешно обновлен! ${updatedPost.content}` })
            } catch (e) {
                return res.status(400).json({ message: `Вы не являетесь автором поста!` })
            }
        } else {
            return res.status(400).json({ message: `Непредвиденная ошибка: ${e}` })
        }

    }
    async deletePost(req, res) {
        const id = req.params['id']
        const post = await Post.findById(id)
        const user = getUserFromToken(req.headers.authorization)
        if (user.username == post.postAuthor) {
            if (!post.content) {
                return res.status(404).json({ message: 'Такого поста не существует!' })
            }
            try {
                const deletedPost = await Post.findByIdAndDelete(id)
                return res.status(500).json({ message: `Пост "${deletedPost.content}" успешно удален!` })
            } catch (e) {
                return res.status(400).json({ message: 'Вы не являетесь автором поста!' })
            }
        } else {
            return res.status(400).json({ message: `Непредвиденная ошибка: ${e}` })
        }
    }

}


module.exports = new postController()