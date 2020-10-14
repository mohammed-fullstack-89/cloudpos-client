'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VarianceSupplier extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            VarianceSupplier.belongsTo(models.variance, { foreignKey: 'item_id', targetKey: 'id' });
            VarianceSupplier.belongsTo(models.supplier, { foreignKey: 'supplier_id', targetKey: 'id' });

        }
    };
    VarianceSupplier.init({
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
        modelName: 'variance_suppliers',
    });
    return VarianceSupplier;
};