'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemTax extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ItemTax.belongsTo(models.item, { foreignKey: 'item_id', targetKey: 'id' });
            ItemTax.belongsTo(models.tax, { foreignKey: 'tax_id', targetKey: 'id' });

        }
    };
    ItemTax.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        item_id: {
            type: DataTypes.BIGINT, allowNull: false, primaryKey: false,

            references: {
                model: 'item',
                key: 'id'
            },
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
            unique: 'unique-genre-per-item'
        },
        tax_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'tax',
                key: 'id'
            },
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
            unique: 'unique-genre-per-tax'
        },
    }, {
        sequelize,
        modelName: 'item_taxes',
    });
    return ItemTax;
};