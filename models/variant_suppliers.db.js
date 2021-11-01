"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VariantSupplier extends Model {
        static associate(models) {
            VariantSupplier.belongsTo(models.variant, { foreignKey: 'item_id', targetKey: 'id' });
            VariantSupplier.belongsTo(models.supplier, { foreignKey: 'supplier_id', targetKey: 'id' });
        }
    }

    VariantSupplier.init({
        item_id: {
            type: DataTypes.BIGINT, allowNull: false, primaryKey: false,
            references: { model: 'variant', key: 'id' }
        },
        supplier_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'supplier',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'variant_suppliers',
    });
    return VariantSupplier;
};