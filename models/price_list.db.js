"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PriceList extends Model {
        static associate(models) {
            this.belongsTo(models.customer, {
                foreignKey: { field: 'customer_id', name: 'customer_id' },
                as: 'customer_price_list'
            });

            this.belongsTo(models.order_types, {
                foreignKey: { field: 'order_type_id', name: 'order_type_id' },
                as: 'order_type_price_list'
            });

            this.hasMany(models.variant_price_list, {
                foreignKey: { field: 'price_list_id', name: 'price_list_id'},
                as: 'variant_price_lists',
                onDelete: 'CASCADE'
            });
        }
    }

    PriceList.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        price_list_id: { type: DataTypes.BIGINT, allowNull: false }
    }, {
        sequelize,
        modelName: 'price_list',
        freezeTableName: true
    });
    return PriceList;
};