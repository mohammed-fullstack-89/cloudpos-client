'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VarianceAlternative extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            VarianceAlternative.belongsTo(models.variance, { foreignKey: 'item_id', targetKey: 'id' });
            VarianceAlternative.belongsTo(models.variance, { foreignKey: 'alternative_id', targetKey: 'id' });

        }
    };
    VarianceAlternative.init({
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
        modelName: 'variance_alternatives',
    });
    return VarianceAlternative;
};