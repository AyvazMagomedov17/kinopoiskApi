import { Router } from "express";
import userRouter from './userRoutes.js';
import favoriteFilmRouter from './FavoriteFilmsRouter.js';
import seeLaterFilmsRouter from './seeLaterFilmsRouter.js';
import friendsRouter from './friendsRouter.js';
const router = Router();
router.use('/user', userRouter);
router.use('/favoriteFilms', favoriteFilmRouter);
router.use('/seeLaterFilms', seeLaterFilmsRouter);
router.use('/friends', friendsRouter);
export default router;
//# sourceMappingURL=index.js.map