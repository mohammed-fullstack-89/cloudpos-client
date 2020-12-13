'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VariantTax extends Model {
        static associate(models) {
            VariantTax.belongsTo(models.variant, { foreignKey: 'item_id', targetKey: 'id' });
            VariantTax.belongsTo(models.tax, { foreignKey: 'tax_id', targetKey: 'id', as: 'variant_tax' });

        }
    };
    VariantTax.init({
        // id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        variant_id: {
            type: DataTypes.BIGINT, allowNull: false,
            references: {
                model: 'variant',
                key: 'id'
            },
            unique: 'unique-genre-per-variant'
        },
        tax_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'tax',
                key: 'id'
            },
            unique: 'unique-genre-per-tax'
        },
    }, {
        sequelize,
        modelName: 'variant_taxes',
    });
    return VariantTax;
};