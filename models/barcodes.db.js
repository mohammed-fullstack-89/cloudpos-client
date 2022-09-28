"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Barcodes extends Model {
        static associate(models) {
            this.belongsTo(models.variant, {
                as: 'barcodes',
                foreignKey: {
                    field: 'variant_id',
                    name: 'variant_id'
                }
            });
        }
    }

    Barcodes.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        barcode: { type: DataTypes.STRING, defualtValue: null, allowNull: false }
    }, {
        sequelize,
        underscored: true,
        modelName: 'barcodes'
    });
    return Barcodes;
};
