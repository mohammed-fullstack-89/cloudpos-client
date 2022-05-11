"use strict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class VariantModifier extends Model {
        static associate(models) {
            this.belongsTo(models.variant, { foreignKey: 'variant_id', targetKey: 'id' });
            this.hasMany(models.stock, {
                as: 'stock',
                foreignKey: { field: 'variant_id', name: 'variant_id' },
                sourceKey: 'modifier_id'
            });
        }
    }

    VariantModifier.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: false },
        modifier_id: { type: DataTypes.BIGINT, allowNull: true, defaultValue: null },
        nick_name_ar: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
        nick_name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: '' },
        sale_price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
        measruing_unit: { type: DataTypes.ENUM('unit', 'weight'), allowNull: false, defaultValue: 'unit' },
        light_price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
        light_qty: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
        normal_price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
        normal_qty: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
        extra_price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
        extra_qty: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
        double_price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
        double_qty: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 }
    }, {
        sequelize,
        modelName: 'variant_modifier'
    });

    return VariantModifier;
};