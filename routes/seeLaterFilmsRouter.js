import { Router } from "express";
import seeLaterFilmsController from "../controllers/seeLaterFilmsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();
router.post('/add', authMiddleware, seeLaterFilmsController.addFilm);
router.get('/get', seeLaterFilmsController.getFilms);
router.get('/getFilm/:kinopoiskId', authMiddleware, seeLaterFilmsController.getOne);
router.delete('/delete/:kinopoiskId', authMiddleware, seeLaterFilmsController.deleteFilm);
export default router;
//# sourceMappingURL=seeLaterFilmsRouter.js.map