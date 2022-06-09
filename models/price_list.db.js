"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PriceList extends Model {
        static associate(models) {
        }
    }

    PriceList.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: false },
        variant_id: { type: DataTypes.BIGINT, defaultValue: null, allowNull: true },
        price_list_id: { type: DataTypes.BIGINT, defaultValue: null, allowNull: true },
        price: { type: DataTypes.FLOAT, defualtValue: 0, allowNull: false }
    }, {
        sequelize,
        modelName: 'price_list'
    });
    return PriceList;
};