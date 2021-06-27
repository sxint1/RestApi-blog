const Router = require('express')
const router = new Router()
const controller = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/getposts', controller.getPosts)
router.get('/myposts', authMiddleware, controller.getMyPosts)
router.post('/create', authMiddleware, controller.newPost)
router.put('/edit/:id', controller.editPost)
router.delete('/delete/:id', controller.deletePost)

module.exports = router