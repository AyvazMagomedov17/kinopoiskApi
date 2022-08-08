
const { Router } = require('express')
const authMiddleware = require('../middlewares/authMiddleware.js')
const seeLaterFilmsController = require('../controllers/seeLaterFilmsController.js')
const router = Router();
router.post('/add', authMiddleware, seeLaterFilmsController.addFilm);
router.get('/get', seeLaterFilmsController.getFilms);
router.get('/getFilm/:kinopoiskId', authMiddleware, seeLaterFilmsController.getOne);
router.delete('/delete/:kinopoiskId', authMiddleware, seeLaterFilmsController.deleteFilm);
module.exports = router;
//# sourceMappingURL=seeLaterFilmsRouter.js.map