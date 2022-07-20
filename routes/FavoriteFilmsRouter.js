import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import favoriteFilmsController from "../controllers/favoriteFilmsController.js";
const router = Router();
router.post('/add', authMiddleware, favoriteFilmsController.addFilm);
router.get('/get', authMiddleware, favoriteFilmsController.getFilms);
router.get('/getFilm/:kinopoiskId', authMiddleware, favoriteFilmsController.getOne);
router.delete('/delete/:kinopoiskId', authMiddleware, favoriteFilmsController.deleteFilm);
export default router;
//# sourceMappingURL=FavoriteFilmsRouter.js.map