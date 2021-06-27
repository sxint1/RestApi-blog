const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const { getUserFromToken } = require('../utils/getUserFromToken')

class comController {
    async newComment(req, res) {
        try {
            const postId = req.params['id']
            const commAuthor = await getUserFromToken(req.headers.authorization)
            const post = await Post.findById(postId)
            console.log(postId)
            const comment = new Comment({
                commAuthorId: commAuthor._id,
                postId: postId,
                content: req.body.content
            })
            await comment.save()
            return res.status(201).json({ message: 'Комментарий успешно опубликован!' })
        } catch (e) {
            return res.status(400).json({ message: `Непредвиденная ошибка: ${e}` })
        }
    }
    async getComments(req, res) {
        try {
            const postId = req.params['id']
            const comments = await Comment.find({ "postId": postId })
                .populate('commAuthorId')
            return res.status(201).json(comments)
        } catch (e) {
            return res.status(400).json({ message: `Непредвиденная ошибка: ${e}` })
        }
    }
    async deleteComment(req, res) {
        try {
            const commentId = req.params['id']
            const currentUser = await getUserFromToken(req.headers.authorization)
            const comment = await Comment.findById(commentId).populate('commAuthorId')
            console.log(comment.commAuthorId.username)
            if(currentUser.username == comment.commAuthorId.username){
                const commentToDelete = await Comment.findByIdAndDelete(commentId)
            } else {
                return res.status(400).json('Вы не являетесь автором комментария!')
            }
            return res.status(201).json({ message: 'Комментарий успешно удален!'})
        } catch(e) {
            return res.status(400).json({ message: `Непредвиденная ошибка: ${e}`})
        }
    }
}

module.exports = new comController()