"use strict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderTypes extends Model {
        static associate(models) {
            this.hasMany(models.price_list, {
                foreignKey: 'price_list_id',
                as: 'order_type_price_list'
            });
        }
    }

    OrderTypes.init({
        id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        name_ar: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
        name_en: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
        is_order: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    },
        {
            sequelize,
            modelName: 'order_types',
            freezeTableName: true
        });

    return OrderTypes;
};