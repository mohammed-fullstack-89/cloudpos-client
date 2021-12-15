"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VariantCategory extends Model {
        static associate(models) {
            VariantCategory.belongsTo(models.variant, { foreignKey: 'item_id', targetKey: 'id', constraints: false });
            VariantCategory.belongsTo(models.category, { foreignKey: 'category_id', targetKey: 'id', constraints: false });
        }
    }

    VariantCategory.init({
        item_id: {
            type: DataTypes.BIGINT, allowNull: true, primaryKey: false,
            references: {
                model: 'variant',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.BIGINT, allowNull: true, primaryKey: false,
            references: {
                model: 'category',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'variant_categories',
    });
    return VariantCategory;
};