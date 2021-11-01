
"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemManufacturing extends Model {
        static associate(models) {
            this.belongsTo(models.stock, {
                foreignKey: {
                    field: 'stockId',
                    name: 'stock_id'
                }
            });
        }
    }

    ItemManufacturing.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        discounted_qty: { type: DataTypes.DOUBLE, defualtValue: null, allowNull: true },
        location_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        lost_qty: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
        old_stock_id: { type: DataTypes.BIGINT, allowNull: false }
    }, {
        sequelize,
        modelName: 'itemManufacturing',
        freezeTableName: true
    });
    return ItemManufacturing;
};
