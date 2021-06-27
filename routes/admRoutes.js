const Router = require('express')
const admController = require('../controllers/admController')
const roleMiddleware = require('../middleware/roleMiddleware')
const router = new Router()

router.get('/getusers', roleMiddleware('ADMIN'), admController.getUsers)
router.put('/ban/:id', roleMiddleware('ADMIN'), admController.banUser)
router.delete('/delete/:id', roleMiddleware('ADMIN'), admController.deletePost)
router.delete('/deletecom/:id', roleMiddleware('ADMIN'), admController.deleteComment)

module.exports = router