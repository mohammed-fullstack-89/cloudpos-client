"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        static associate(models) {
            this.hasMany(models.variant, {
                as: 'variant_brand',
                foreignKey: {
                    field: 'brandId',
                    name: 'brand_id'
                }
            });
        }
    }

    Brand.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        discount_type: { type: DataTypes.STRING, allowNull: true },
        discount_value: { type: DataTypes.DOUBLE, defualtValue: null, allowNull: true }
    }, {
        sequelize,
        underscored: true,
        modelName: 'brand',
        indexes: [{
            name: 'brand_name_ar_foreign',
            fields: ['name_ar']
        }, {
            name: 'brand_name_en_foreign',
            fields: ['name_en']
        }]
    });
    return Brand;
};
