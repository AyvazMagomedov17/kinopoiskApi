import { Router } from "express";
import friendsController from "../controllers/friendsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();
router.get('/get', friendsController.getFriends);
router.post('/add', authMiddleware, friendsController.addFriend);
router.delete('/delete/:friendId', authMiddleware, friendsController.deleteFriend);
export default router;
//# sourceMappingURL=friendsRouter.js.map