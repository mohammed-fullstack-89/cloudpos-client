"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Scale extends Model {
        static associate(models) {
            this.hasMany(models.variant, {
                as: 'variant_scale_barcode',
                foreignKey: {
                    field: 'scale_barcode_id', name: 'scaleId'
                }
            });
        }
    }

    Scale.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        start: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        end: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        number_of_digit: { type: DataTypes.INTEGER, allowNull: true },
        number_of_digits_before_fraction: { type: DataTypes.INTEGER, allowNull: true },
        has_serial: { type: DataTypes.TINYINT, allowNull: true }
    }, {
        sequelize,
        modelName: 'scale'
    });
    return Scale;
};