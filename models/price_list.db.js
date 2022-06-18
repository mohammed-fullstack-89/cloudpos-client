"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PriceList extends Model {
        static associate(models) {
            this.belongsTo(models.customer, {
                foreignKey: { field: 'customer_id', name: 'customer_id' },
                as: 'customer_id'
            });

            this.belongsTo(models.order_types, {
                foreignKey: { field: 'order_type_id', name: 'order_type_id' },
                as: 'order_type_id'
            });

            this.hasMany(models.variant_price_list, {
                foreignKey: { field: 'price_list_id', name: 'price_list_id' },
                as: 'variant_price_list',
                sourceKey: 'price_list_id'
            });
        }
    }

    PriceList.init({
        id: { type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: false },
        price_list_id: { type: DataTypes.BIGINT, allowNull: false }
    }, {
        sequelize,
        modelName: 'price_list',
        freezeTableName: true
    });
    return PriceList;
};