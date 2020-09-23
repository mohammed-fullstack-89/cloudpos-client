const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require("../connection");
class Card extends Model { }
Card.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name_en: DataTypes.STRING,
    name_ar: DataTypes.STRING,

}, { db, tableName: "card", charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' }
)
module.exports = Card;