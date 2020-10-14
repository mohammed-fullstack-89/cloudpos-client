'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VarianceCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            VarianceCategory.belongsTo(models.variance, { foreignKey: 'item_id', targetKey: 'id' });
            VarianceCategory.belongsTo(models.category, { foreignKey: 'category_id', targetKey: 'id' });

        }
    };
    VarianceCategory.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        variance_id: {
            type: DataTypes.BIGINT, allowNull: false, primaryKey: false,

            references: {
                model: 'variance',
                key: 'id'
            },
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
            unique: 'unique-genre-per-variance'
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
        modelName: 'variance_categories',
    });
    return VarianceCategory;
};