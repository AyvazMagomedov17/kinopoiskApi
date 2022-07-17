var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import ApiError from "../Error/Error.js";
import { validationResult } from 'express-validator';
import Models from '../models/models.js';
import bcrypt from 'bcrypt';
const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, // вшивается в середину вебтокена
    process.env.SECRET_KEY, // секрет ключ
    { expiresIn: '24h' }); // сколько будет жить ключ
};
class UserController {
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return next(ApiError.badRequest('Ошибка при регистрации'));
                }
                const { email, password, name } = req.body;
                console.log('BODY', req.body);
                if (!email || !password) {
                    return next(ApiError.badRequest('Не указан email или password'));
                }
                if (!name) {
                    return next(ApiError.badRequest('Не указан name'));
                }
                const candidate = yield Models.User.findOne({ where: { email } });
                if (candidate) {
                    return next(ApiError.badRequest('Пользователь с таким email уже зарегистрирован'));
                }
                const hashPassword = yield bcrypt.hash(String(password), 5);
                const user = yield Models.User.create({ email, password: hashPassword, name });
                const token = generateJwt(user.id, user.email);
                return res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        avatar: user.avatar
                    }
                });
            }
            catch (error) {
                next(ApiError.badRequest(error.message));
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield Models.User.findOne({ where: { email } });
                if (!user) {
                    return next(ApiError.badRequest('Пользователь с таким email не найден'));
                }
                const isPassValid = bcrypt.compareSync(password, user.password); // сравнивает незашифрованный пароль с зашифрованным
                if (!isPassValid) {
                    return next(ApiError.badRequest('Неправильный пароль'));
                }
                const token = generateJwt(user.id, user.email);
                return res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar
                    }
                });
            }
            catch (error) {
                return next(ApiError.internal(error.message));
            }
        });
    }
    auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Models.User.findOne({ where: { id: req.user.id } });
                const token = generateJwt(user.id, user.email);
                return res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar
                    }
                });
            }
            catch (error) {
                next(ApiError.badRequest(error.message));
            }
        });
    }
}
export default new UserController();
//# sourceMappingURL=userController.js.map