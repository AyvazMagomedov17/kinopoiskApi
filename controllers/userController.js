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
import { Sequelize } from "sequelize";
import { v4 } from 'uuid';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { config } from 'dotenv';
config();
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
                        status: user.status,
                        avatar: process.env.URL + user.avatar
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
                        status: user.status,
                        avatar: process.env.URL + user.avatar
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
                        status: user.status,
                        avatar: process.env.URL + user.avatar
                    }
                });
            }
            catch (error) {
                next(ApiError.badRequest(error.message));
            }
        });
    }
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                if (!id) {
                    return next(ApiError.badRequest('Вы не указали id'));
                }
                const user = yield Models.User.findOne({ where: { id: Number(id) } });
                if (!user) {
                    return res.json({
                        item: null
                    });
                }
                return res.json({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        status: user.status,
                        avatar: process.env.URL + user.avatar
                    }
                });
            }
            catch (error) {
                return next(ApiError.forbidden(error.message));
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.query.page) || 1;
                // @ts-ignore
                const name = req.query.name;
                const limit = 20;
                const offset = page * limit - limit;
                if (!name) {
                    const { count, rows } = yield Models.User.findAndCountAll({ limit, offset });
                    const totalPages = Math.ceil(count / limit);
                    return res.json({
                        count,
                        totalPages,
                        items: rows.reverse()
                    });
                }
                else {
                    // Позволяет исктаь по имени lowercase и если какая-то часть текста содержится в
                    const { count, rows } = yield Models.User.findAndCountAll({
                        // @ts-ignore
                        where: {
                            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${name.toLowerCase()}%`)
                        }
                    });
                    const totalPages = Math.ceil(count / limit);
                    return res.json({
                        count,
                        totalPages,
                        items: rows.reverse()
                    });
                }
            }
            catch (error) {
                return next(ApiError.forbidden(error.message));
            }
        });
    }
    updateInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, status } = req.body;
                // @ts-ignore
                const id = req.user.id;
                if (!name) {
                    return next(ApiError.badRequest('Не указан name'));
                }
                if (!status) {
                    return next(ApiError.badRequest('Не указан status'));
                }
                yield Models.User.update({ name, status }, { where: { id: Number(id) } });
                const user = yield Models.User.findOne({ where: { id: Number(id) } });
                return res.json({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        status: user.status,
                        avatar: user.avatar
                    }
                });
            }
            catch (error) {
                next(ApiError.forbidden(error.message));
            }
        });
    }
    updateAvatar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const id = req.user.id;
                const { img } = req.files;
                const fileName = v4() + '.jpg';
                const userBefore = yield Models.User.findByPk(Number(id));
                const avatarBefore = userBefore.get().avatar.slice(process.env.URL.length);
                if (avatarBefore) {
                    console.log('AVATAR', avatarBefore);
                    const filePathToAvtarBefore = path.resolve(__dirname, '..', 'static', avatarBefore);
                    fs.unlink(filePathToAvtarBefore, (error) => {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
                // @ts-ignore
                yield img.mv(path.resolve(__dirname, '..', 'static', fileName));
                const user = yield Models.User.update({ avatar: fileName }, { where: { id: Number(id) } });
                return res.json({
                    avatar: process.env.URL + fileName
                });
            }
            catch (error) {
                next(ApiError.forbidden(error.message));
            }
        });
    }
}
export default new UserController();
//# sourceMappingURL=userController.js.map