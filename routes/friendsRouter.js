
const { Router } = require('express')
const authMiddleware = require('../middlewares/authMiddleware.js')
const friendsController = require('../controllers/friendsController.js')
const router = Router();
router.get('/get', friendsController.getFriends);
router.post('/add', authMiddleware, friendsController.addFriend);
router.delete('/delete/:friendId', authMiddleware, friendsController.deleteFriend);
module.exports = router;
//# sourceMappingURL=friendsRouter.js.map