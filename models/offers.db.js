"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    
    class Offers extends Model {
    }

    Offers.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, defaultValue: '', allowNull: false },
        date_type: { type: DataTypes.STRING, defualtValue: '', allowNull: false },
        date_from: { type: DataTypes.STRING, defualtValue: '', allowNull: false },
        date_to: { type: DataTypes.STRING, defualtValue: '', allowNull: false },
        days: { type: DataTypes.STRING, defualtValue: '', allowNull: false },
        promotion_type: { type: DataTypes.ENUM('spend_amount', 'items_free', 'amount'), defaultValue: null, allowNull: true },
        spend_amount: { type: DataTypes.ENUM('discount', 'item', 'free_delivery'), defaultValue: null, allowNull: true },
        discount_type: { type: DataTypes.ENUM('percentage', 'value', 'undefined'), defualtValue: null, allowNull: true },
        discount_value: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: false },
        spend_amount_value: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: false },
        qty_x: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: true },
        qty_y: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: true },
        x_amount: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: true },
        promotion_variant: { type: DataTypes.STRING, defaultValue: '', allowNull: true }
    }, {
        sequelize,
        modelName: 'offers'
    });
    return Offers;
};