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
class FavoriteFilmsController {
    addFilm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                // @ts-ignore
                const id = req.user.id;
                const film = yield Models.FavoriteFilmS.create(Object.assign(Object.assign({}, body), { userId: Number(id) }));
                return res.json({
                    item: film
                });
            }
            catch (error) {
                return next(ApiError.forbidden(error.message));
            }
        });
    }
    getFilms(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const id = req.user.id;
                const { count, rows } = yield Models.FavoriteFilmS.findAndCountAll({ where: { userId: Number(id) }, });
                if (!count) {
                    return next(ApiError.badRequest('Избранные фильмы не найдены'));
                }
                return res.json({
                    count,
                    items: rows
                });
            }
            catch (error) {
                next(ApiError.forbidden(error.message));
            }
        });
    }
}
export default new FavoriteFilmsController();
//# sourceMappingURL=favoriteFilmsController.js.map