const jwt = require('jsonwebtoken')
const { config } = require('dotenv')
config();
module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Пользователь не авторизован' });
    }
}
//# sourceMappingURL=authMiddleware.js.map