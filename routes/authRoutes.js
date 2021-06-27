const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/registration',[
  check('username', 'Имя пользователя не может быть пустым').notEmpty(),
  check('password', 'Длинна пароля должна быть от 4 до 16 символов').isLength({min: 4, max: 16})  
] , controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['USER']), controller.getUsers)

module.exports = router