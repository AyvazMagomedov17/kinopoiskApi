const sequelize = require('../db/db.js')
const { DataTypes } = require('sequelize')
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: true },
    avatar: { type: DataTypes.TEXT, allowNull: true },
});
const FavoriteFilmS = sequelize.define('favorite_films', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kinopoiskId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    imdbId: { type: DataTypes.TEXT, allowNull: true },
    nameRu: { type: DataTypes.TEXT, allowNull: true },
    nameEn: { type: DataTypes.TEXT, allowNull: true },
    nameOriginal: { type: DataTypes.TEXT, allowNull: true },
    posterUrl: { type: DataTypes.TEXT },
    posterUrlPreview: { type: DataTypes.TEXT },
    coverUrl: { type: DataTypes.TEXT, allowNull: true },
    logoUrl: { type: DataTypes.TEXT, allowNull: true },
    reviewsCount: { type: DataTypes.INTEGER, allowNull: false },
    ratingGoodReview: { type: DataTypes.FLOAT, allowNull: true },
    ratingGoodReviewVoteCount: { type: DataTypes.INTEGER, allowNull: true },
    ratingKinopoisk: { type: DataTypes.FLOAT, allowNull: true },
    ratingKinopoiskVoteCount: { type: DataTypes.INTEGER, allowNull: true },
    ratingImdb: { type: DataTypes.FLOAT, allowNull: true },
    ratingImdbVoteCount: { type: DataTypes.INTEGER, allowNull: true },
    ratingFilmCritics: { type: DataTypes.FLOAT, allowNull: true },
    ratingFilmCriticsVoteCount: { type: DataTypes.INTEGER, allowNull: true },
    ratingAwait: { type: DataTypes.FLOAT, allowNull: true },
    ratingAwaitCount: { type: DataTypes.INTEGER, allowNull: true },
    ratingRfCritics: { type: DataTypes.FLOAT, allowNull: true },
    ratingRfCriticsVoteCount: { type: DataTypes.INTEGER, allowNull: true },
    webUrl: { type: DataTypes.TEXT, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: true },
    filmLength: { type: DataTypes.INTEGER, allowNull: true },
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
    startYear: { type: DataTypes.INTEGER, allowNull: true },
    endYear: { type: DataTypes.INTEGER, allowNull: true },
    serial: { type: DataTypes.BOOLEAN, allowNull: true },
    shortFilm: { type: DataTypes.BOOLEAN, allowNull: true },
    completed: { type: DataTypes.BOOLEAN, allowNull: true }
});
const SeeLaterFilms = sequelize.define('see_later_films', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    kinopoiskId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    imdbId: { type: DataTypes.TEXT, allowNull: true },
    nameRu: { type: DataTypes.TEXT, allowNull: true },
    nameEn: { type: DataTypes.TEXT, allowNull: true },
    nameOriginal: { type: DataTypes.TEXT, allowNull: true },
    posterUrl: { type: DataTypes.TEXT },
    posterUrlPreview: { type: DataTypes.TEXT },
    coverUrl: { type: DataTypes.TEXT, allowNull: true },
    logoUrl: { type: DataTypes.TEXT, allowNull: true },
    reviewsCount: { type: DataTypes.INTEGER, allowNull: false },
    ratingGoodReview: { type: DataTypes.FLOAT, allowNull: true },
    ratingGoodReviewVoteCount: { type: DataTypes.INTEGER, allowNull: true },
    ratingKinopoisk: { type: DataTypes.FLOAT, allowNull: true },
    ratingKinopoiskVoteCount: { type: DataTypes.INTEGER, allowNull: true },
    ratingImdb: { type: DataTypes.FLOAT, allowNull: true },
    ratingImdbVoteCount: { type: DataTypes.INTEGER, allowNull: true },
    ratingFilmCritics: { type: DataTypes.FLOAT, allowNull: true },
    ratingFilmCriticsVoteCount: { type: DataTypes.INTEGER, allowNull: true },
    ratingAwait: { type: DataTypes.FLOAT, allowNull: true },
    ratingAwaitCount: { type: DataTypes.INTEGER, allowNull: true },
    ratingRfCritics: { type: DataTypes.FLOAT, allowNull: true },
    ratingRfCriticsVoteCount: { type: DataTypes.INTEGER, allowNull: true },
    webUrl: { type: DataTypes.TEXT, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: true },
    filmLength: { type: DataTypes.INTEGER, allowNull: true },
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
    startYear: { type: DataTypes.INTEGER, allowNull: true },
    endYear: { type: DataTypes.INTEGER, allowNull: true },
    serial: { type: DataTypes.BOOLEAN, allowNull: true },
    shortFilm: { type: DataTypes.BOOLEAN, allowNull: true },
    completed: { type: DataTypes.BOOLEAN, allowNull: true }
});
const Friends = sequelize.define('friends', {
    id: { type: DataTypes.INTEGER, primaryKey: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: true },
    avatar: { type: DataTypes.TEXT, allowNull: true }
});
User.hasMany(FavoriteFilmS);
FavoriteFilmS.belongsTo(User);
User.hasMany(SeeLaterFilms);
SeeLaterFilms.belongsTo(User);
User.hasMany(Friends);
Friends.belongsTo(User);
const Models = { User, FavoriteFilmS, SeeLaterFilms, Friends };
module.exports = Models;
//# sourceMappingURL=models.js.map