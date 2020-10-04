'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemAlternative extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ItemAlternative.belongsTo(models.item, { foreignKey: 'item_id', targetKey: 'id' });
            ItemAlternative.belongsTo(models.item, { foreignKey: 'alternative_id', targetKey: 'id' });

        }
    };
    ItemAlternative.init({
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
        alternative_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'alternative',
                key: 'id'
            },
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
            unique: 'unique-genre-per-alternative'
        },
    }, {
        sequelize,
        modelName: 'item_alternatives',
    });
    return ItemAlternative;
};