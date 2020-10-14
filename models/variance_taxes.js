'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VarianceTax extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            VarianceTax.belongsTo(models.variance, { foreignKey: 'item_id', targetKey: 'id' });
            VarianceTax.belongsTo(models.tax, { foreignKey: 'tax_id', targetKey: 'id', as: 'get_tax' });

        }
    };
    VarianceTax.init({
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
        modelName: 'variance_taxes',
    });
    return VarianceTax;
};