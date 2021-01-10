'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VariantAlternative extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            VariantAlternative.belongsTo(models.variant, { foreignKey: 'item_id', targetKey: 'id' });
            VariantAlternative.belongsTo(models.variant, { foreignKey: 'item_id', targetKey: 'id' });

        }
    };
    VariantAlternative.init({
<<<<<<< HEAD
        // id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        item_id: {
=======
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        variant_id: {
>>>>>>> ..
            type: DataTypes.BIGINT, allowNull: false, primaryKey: false,

            references: {
                model: 'variant',
                key: 'id'
            },
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
            // unique: 'unique-genre-per-variant'
        },
        alternative_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'alternative',
                key: 'id'
            },
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
            // unique: 'unique-genre-per-alternative'
        },
    }, {
        sequelize,
        modelName: 'variant_alternatives',
    });
    return VariantAlternative;
};