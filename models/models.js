import sequelize from '../db/db.js';
import { DataTypes } from 'sequelize';
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.TEXT, allowNull: true }
});
const FavoriteFilmS = sequelize.define('favorite_films', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kinopoiskId: { type: DataTypes.BIGINT, allowNull: false, unique: true },
    imdbId: { type: DataTypes.TEXT, allowNull: true },
    nameRu: { type: DataTypes.TEXT, allowNull: true },
    nameEn: { type: DataTypes.TEXT, allowNull: true },
    nameOriginal: { type: DataTypes.TEXT, allowNull: true },
    posterUrl: { type: DataTypes.TEXT },
    posterUrlPreview: { type: DataTypes.TEXT },
    coverUrl: { type: DataTypes.TEXT, allowNull: true },
    logoUrl: { type: DataTypes.TEXT, allowNull: true },
    reviewsCount: { type: DataTypes.BIGINT, allowNull: false },
    ratingGoodReview: { type: DataTypes.FLOAT, allowNull: true },
    ratingGoodReviewVoteCount: { type: DataTypes.BIGINT, allowNull: true },
    ratingKinopoisk: { type: DataTypes.FLOAT, allowNull: true },
    ratingKinopoiskVoteCount: { type: DataTypes.BIGINT, allowNull: true },
    ratingImdb: { type: DataTypes.FLOAT, allowNull: true },
    ratingImdbVoteCount: { type: DataTypes.BIGINT, allowNull: true },
    ratingFilmCritics: { type: DataTypes.FLOAT, allowNull: true },
    ratingFilmCriticsVoteCount: { type: DataTypes.BIGINT, allowNull: true },
    ratingAwait: { type: DataTypes.FLOAT, allowNull: true },
    ratingAwaitCount: { type: DataTypes.BIGINT, allowNull: true },
    ratingRfCritics: { type: DataTypes.FLOAT, allowNull: true },
    ratingRfCriticsVoteCount: { type: DataTypes.BIGINT, allowNull: true },
    webUrl: { type: DataTypes.TEXT, allowNull: false },
    year: { type: DataTypes.BIGINT, allowNull: true },
    filmLength: { type: DataTypes.BIGINT, allowNull: true },
    slogan: { type: DataTypes.TEXT, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    shortDescription: { type: DataTypes.TEXT, allowNull: true },
    editorAnnotation: { type: DataTypes.TEXT, allowNull: true },
    isTicketsAvailable: { type: DataTypes.BOOLEAN },
    productionStatus: { type: DataTypes.TEXT, allowNull: true },
    type: { type: DataTypes.TEXT },
    ratingMpaa: { type: DataTypes.TEXT, allowNull: true },
    ratingAgeLimits: { type: DataTypes.TEXT, allowNull: true },
    hasImax: { type: DataTypes.BOOLEAN, allowNull: true },
    has3D: { type: DataTypes.BOOLEAN, allowNull: true },
    lastSync: { type: DataTypes.TEXT },
    countries: { type: DataTypes.ARRAY(DataTypes.JSON) },
    genres: { type: DataTypes.ARRAY(DataTypes.JSON) },
    startYear: { type: DataTypes.BIGINT, allowNull: true },
    endYear: { type: DataTypes.BIGINT, allowNull: true },
    serial: { type: DataTypes.BOOLEAN, allowNull: true },
    shortFilm: { type: DataTypes.BOOLEAN, allowNull: true },
    completed: { type: DataTypes.BOOLEAN, allowNull: true }
});
User.hasMany(FavoriteFilmS);
FavoriteFilmS.belongsTo(User);
const Models = { User, FavoriteFilmS };
export default Models;
//# sourceMappingURL=models.js.map