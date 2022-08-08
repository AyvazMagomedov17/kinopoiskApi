const { Router } = require('express')
const authMiddleware = require('../middlewares/authMiddleware.js')
const favoriteFilmsController = require('../controllers/favoriteFilmsController.js')
const router = Router();
router.post('/add', authMiddleware, favoriteFilmsController.addFilm);
router.get('/get', favoriteFilmsController.getFilms);
router.get('/getFilm/:kinopoiskId', authMiddleware, favoriteFilmsController.getOne);
router.delete('/delete/:kinopoiskId', authMiddleware, favoriteFilmsController.deleteFilm);
module.exports = router;
//# sourceMappingURL=FavoriteFilmsRouter.js.map