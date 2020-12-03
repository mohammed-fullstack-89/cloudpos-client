'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Stock extends Model {
        static associate(models) {
            this.belongsTo(models.variant, {
                as: 'stock',
                foreignKey: {
                    field: 'variant_id',
                    name: 'variant_id'
                }
            });

            this.belongsTo(models.price, {
                as: 'variant_price',
                foreignKey: {
                    name: 'price_id',
                    field: 'price_id'
                }

            });

            this.belongsTo(models.segment, {
                as: 'variant_segment',
                foreignKey: {
                    field: 'segment_id',
                    name: 'segment_id',

                }
            });
        }
    };



    Stock.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        qty: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
        manufacture_type: { type: DataTypes.ENUM('none',), allowNull: false },
        qty_in: { type: DataTypes.ENUM('branch', 'store'), allowNull: false },
    },
        {
            sequelize,
            modelName: 'stock',
        });
    return Stock;
}





