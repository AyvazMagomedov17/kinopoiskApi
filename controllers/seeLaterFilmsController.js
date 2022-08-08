var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ApiError = require('../Error/Error.js')
const Models = require('../models/models.js')
class SeeLaterFilmsController {
    addFilm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                // @ts-ignore
                const id = req.user.id;
                const candidate = yield Models.SeeLaterFilms.findOne({ where: { kinopoiskId: Number(body.kinopoiskId) } });
                if (candidate) {
                    next(ApiError.badRequest('Фильм уже находится в избранных'));
                }
                const film = yield Models.SeeLaterFilms.create(Object.assign(Object.assign({}, body), { userId: Number(id) }));
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
                const id = req.query.id;
                if (type) {
                    const { count, rows } = yield Models.SeeLaterFilms.findAndCountAll({ where: { userId: Number(id), type }, limit, offset });
                    const totalPages = Math.ceil(count / limit);
                    return res.json({
                        count,
                        totalPages,
                        items: rows.reverse()
                    });
                }
                else {
                    const { count, rows } = yield Models.SeeLaterFilms.findAndCountAll({ where: { userId: Number(id) }, limit, offset });
                    const totalPages = Math.ceil(count / limit);
                    return res.json({
                        count,
                        totalPages,
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
                const film = yield Models.SeeLaterFilms.findOne({ where: { userId: Number(id), kinopoiskId: Number(kinopoiskId) } });
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
                const film = yield Models.SeeLaterFilms.findOne({ where: { userId: Number(id), kinopoiskId: Number(kinopoiskId) } });
                if (!film) {
                    next(ApiError.badRequest('Фильм не найден'));
                }
                yield Models.SeeLaterFilms.destroy({ where: { userId: Number(id), kinopoiskId: Number(kinopoiskId) } });
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
module.exports = new SeeLaterFilmsController();
//# sourceMappingURL=seeLaterFilmsController.js.map