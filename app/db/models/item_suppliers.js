'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemSupplier extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ItemSupplier.belongsTo(models.item, { foreignKey: 'item_id', targetKey: 'id' });
            ItemSupplier.belongsTo(models.item, { foreignKey: 'supplier_id', targetKey: 'id' });

        }
    };
    ItemSupplier.init({
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
        supplier_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'supplier',
                key: 'id'
            },
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
            unique: 'unique-genre-per-supplier'
        },
    }, {
        sequelize,
        modelName: 'item_suppliers',
    });
    return ItemSupplier;
};