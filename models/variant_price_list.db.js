"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VariantPriceList extends Model {
        static associate(models) {
            this.belongsTo(models.price_list, {
                foreignKey: { field: 'price_list_id', name: 'price_list_id' },
                as: 'variant_price_lists'
            });
        }
    }

    VariantPriceList.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: false },
        variant_id: { type: DataTypes.BIGINT, allowNull: false },
        price: { type: DataTypes.FLOAT, defualtValue: 0, allowNull: false }
    }, {
        sequelize,
        modelName: 'variant_price_list',
        freezeTableName: true
    });
    return VariantPriceList;
};