
const { Router } = require('express')
const userRouter = require('./userRoutes.js')
const favoriteFilmRouter = require('./FavoriteFilmsRouter.js')
const seeLaterFilmsRouter = require('./seeLaterFilmsRouter.js')
const friendsRouter = require('./friendsRouter.js')
const router = Router();
router.use('/user', userRouter);
router.use('/favoriteFilms', favoriteFilmRouter);
router.use('/seeLaterFilms', seeLaterFilmsRouter);
router.use('/friends', friendsRouter);
module.exports = router;
//# sourceMappingURL=index.js.map