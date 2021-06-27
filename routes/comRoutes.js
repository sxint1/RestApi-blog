const comController = require('../controllers/comController')
const authMiddleware = require('../middleware/authMiddleware')
const Router = require('express')
const router = new Router()

router.post('/new/:id', authMiddleware, comController.newComment)
router.get('/get/:id', authMiddleware, comController.getComments)
router.delete('/delete/:id', authMiddleware, comController.deleteComment)

module.exports = router