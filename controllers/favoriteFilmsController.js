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
                const candidate = yield Models.FavoriteFilmS.findOne({ where: { kinopoiskId: Number(body.kinopoiskId) } });
                if (candidate) {
                    next(ApiError.badRequest('Фильм уже находится в избранных'));
                }
                const film = yield Models.FavoriteFilmS.create(Object.assign(Object.assign({}, body), { userId: Number(id) }));
                return res.json({
                    film
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
                const page = Number(req.query.page) || 1;
                const type = req.query.type;
                const limit = 20;
                const offset = page * limit - limit;
                // @ts-ignore
                const id = req.user.id;
                if (type) {
                    const { count, rows } = yield Models.FavoriteFilmS.findAndCountAll({ where: { userId: Number(id), type }, limit, offset });
                    return res.json({
                        count,
                        items: rows
                    });
                }
                else {
                    const { count, rows } = yield Models.FavoriteFilmS.findAndCountAll({ where: { userId: Number(id) }, limit, offset });
                    return res.json({
                        count,
                        items: rows
                    });
                }
            }
            catch (error) {
                return next(ApiError.forbidden(error.message));
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const kinopoiskId = req.params.kinopoiskId;
                // @ts-ignore
                const id = req.user.id;
                const film = yield Models.FavoriteFilmS.findOne({ where: { userId: Number(id), kinopoiskId: Number(kinopoiskId) } });
                if (!film) {
                    return res.json({
                        item: null
                    });
                }
                return res.json({
                    item: film
                });
            }
            catch (error) {
                return next(ApiError.forbidden(error.message));
            }
        });
    }
    deleteFilm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const kinopoiskId = req.params.kinopoiskId;
                // @ts-ignore
                const id = req.user.id;
                const film = yield Models.FavoriteFilmS.findOne({ where: { userId: Number(id), kinopoiskId: Number(kinopoiskId) } });
                if (!film) {
                    next(ApiError.badRequest('Фильм не найден'));
                }
                yield Models.FavoriteFilmS.destroy({ where: { userId: Number(id), kinopoiskId: Number(kinopoiskId) } });
                return res.json({
                    isDeleted: true,
                    item: film
                });
            }
            catch (error) {
                return next(ApiError.forbidden(error.message));
            }
        });
    }
}
export default new FavoriteFilmsController();
//# sourceMappingURL=favoriteFilmsController.js.map