"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notes extends Model {
        static associate(models) {
        }
    }

    Notes.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
        name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        type: { type: DataTypes.STRING, defualtValue: '', allowNull: false }
    }, {
        sequelize,
        modelName: 'notes',
        freezeTableName: true
    });
    return Notes;
};