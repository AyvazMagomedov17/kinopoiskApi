
const { Router } = require('express')
const { check } = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware.js')
const userController = require('../controllers/userController.js')
const router = Router();
router.post('/registration', [
    check('email', 'Неправильный email').isEmail(),
    check('password', 'Пароль должен быть длинее 3 символов и короче 12').isLength({ min: 3, max: 12 })
], userController.createUser);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.auth);
router.get('/getUser/:id', userController.findOne);
router.get('/get', userController.getUsers);
router.put('/updateInfo', authMiddleware, userController.updateInfo);
router.put('/updateAvatar', authMiddleware, userController.updateAvatar);
module.exports = router;
//# sourceMappingURL=userRoutes.js.map