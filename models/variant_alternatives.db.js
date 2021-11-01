"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VariantAlternative extends Model {
        static associate(models) {
            VariantAlternative.belongsTo(models.variant, { foreignKey: 'item_id', targetKey: 'id' });
            VariantAlternative.belongsTo(models.variant, { foreignKey: 'item_id', targetKey: 'id' });
        }
    }

    VariantAlternative.init({
        item_id: {
            type: DataTypes.BIGINT, allowNull: false, primaryKey: false,
            references: {
                model: 'variant',
                key: 'id'
            }
        },
        alternative_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'alternative',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'variant_alternatives'
    });
    return VariantAlternative;
};