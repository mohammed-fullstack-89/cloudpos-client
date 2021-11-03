"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemManufacturing extends Model {
        static associate(models) {
            this.belongsTo(models.variant, {
                as: 'manufacturing_item',
                foreignKey: { field: 'item_id', name: 'item_id' }
            });
        }
    }

    ItemManufacturing.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        variant_id: { type: DataTypes.BIGINT, defaultValue: 0 },
        available_qty: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: false },
        discounted_qty: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: false },
        lost_qty: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: false },
        total_qty: { type: DataTypes.DOUBLE, defaultValue: 0, allowNull: false }
    }, {
        sequelize,
        modelName: 'itemManufacturing',
        freezeTableName: true
    });
    return ItemManufacturing;
};
