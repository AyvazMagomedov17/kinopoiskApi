import { Router } from "express";
import { check } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import userController from "../controllers/userController.js";
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
export default router;
//# sourceMappingURL=userRoutes.js.map