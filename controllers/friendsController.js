var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Models from '../models/models.js';
import ApiError from "../Error/Error.js";
class FriendsController {
    getFriends(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Number(req.query.page) || 1;
                const id = req.query.id;
                const limit = 20;
                if (!id) {
                    return next(ApiError.badRequest('Вы не указали id'));
                }
                const offset = page * limit - limit;
                const { count, rows } = yield Models.Friends.findAndCountAll({ where: { userId: Number(id) }, offset, limit });
                const totalPages = Math.ceil(count / limit);
                res.json({
                    count,
                    totalPages,
                    itemS: rows.reverse()
                });
            }
            catch (error) {
                next(ApiError.forbidden(error.message));
            }
        });
    }
    addFriend(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                // @ts-ignore
                const id = req.user.id;
                const candidate = yield Models.Friends.findOne({ where: { id: Number(body.id), userId: Number(id) } });
                if (candidate) {
                    return next(ApiError.badRequest('Пользователь уже добавлен в друзья'));
                }
                const friend = yield Models.Friends.create(Object.assign(Object.assign({}, body), { userId: Number(id) }));
                return res.json({
                    item: friend
                });
            }
            catch (error) {
                return next(ApiError.forbidden(error.message));
            }
        });
    }
    deleteFriend(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const friendId = req.params.friendId;
                // @ts-ignore
                const id = req.user.id;
                const candidate = yield Models.Friends.findOne({ where: { id: Number(friendId), userId: Number(id) } });
                if (!candidate) {
                    return next(ApiError.badRequest('Друг не найден'));
                }
                yield Models.Friends.destroy({ where: { id: Number(friendId), userId: Number(id) } });
                return res.json({
                    isDeleted: true,
                    item: candidate
                });
            }
            catch (error) {
                return next(ApiError.badRequest(error.message));
            }
        });
    }
}
export default new FriendsController();
//# sourceMappingURL=friendsController.js.map