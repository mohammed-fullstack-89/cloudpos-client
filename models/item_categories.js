'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ItemCategory.belongsTo(models.item, { foreignKey: 'item_id', targetKey: 'id' });
            ItemCategory.belongsTo(models.category, { foreignKey: 'category_id', targetKey: 'id' });

        }
    };
    ItemCategory.init({
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
        category_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'category',
                key: 'id'
            },
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
            unique: 'unique-genre-per-category'
        },
    }, {
        sequelize,
        modelName: 'item_categories',
    });
    return ItemCategory;
};