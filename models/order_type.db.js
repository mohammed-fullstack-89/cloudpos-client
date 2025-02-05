"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderTypes extends Model {
        static associate(models) {
            this.hasOne(models.price_list, {
                foreignKey: 'order_type_id',
                as: 'order_type_price_list'
            });
        }
    }

    OrderTypes.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
        name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
        is_order: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        service_percentage: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    }, {
        sequelize,
        modelName: 'order_types',
        freezeTableName: true
    });
    return OrderTypes;
};