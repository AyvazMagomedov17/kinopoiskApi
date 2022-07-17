import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import favoriteFilmsController from "../controllers/favoriteFilmsController.js";
const router = Router();
router.post('/add', authMiddleware, favoriteFilmsController.addFilm);
router.get('/get', authMiddleware, favoriteFilmsController.getFilms);
export default router;
//# sourceMappingURL=FavoriteFilmsRouter.js.map