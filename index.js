var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const express = require('express')
const cors = require('cors')
const router = require('./routes/index.js')
const Sequelize = require('./db/db.js')
const ErorrMiddleware = require('./middlewares/ErrorHandlingMiddleware.js')
const { config } = require('dotenv')
const path = require('path')
const fileUpload = require('express-fileupload')
config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);
app.use(ErorrMiddleware);
const PORT = process.env.PORT || 5000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Sequelize.authenticate();
        yield Sequelize.sync();
        app.listen(PORT, () => console.log(`Сервер стартовал на порту ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
//# sourceMappingURL=index.js.map