import { Router } from "express";
import userRouter from './userRoutes.js';
import favoriteFilmRouter from './FavoriteFilmsRouter.js';
const router = Router();
router.use('/user', userRouter);
router.use('/favoriteFilms', favoriteFilmRouter);
export default router;
//# sourceMappingURL=index.js.map