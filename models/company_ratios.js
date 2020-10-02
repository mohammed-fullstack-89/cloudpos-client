'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CompanyRatio extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CompanyRatio.belongsTo(models.company, { foreignKey: 'company_id', targetKey: 'id' });
            CompanyRatio.belongsTo(models.ratio, { foreignKey: 'ratio_id', targetKey: 'id' });

        }
    };
    CompanyRatio.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        company_id: {
            type: DataTypes.BIGINT, allowNull: false, primaryKey: false,

            references: {
                model: 'company',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            unique: 'unique-genre-per-company'
        },
        ratio_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'ratio',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            unique: 'unique-genre-per-ratio'
        },
    }, {
        sequelize,
        modelName: 'company_ratios',
    });
    return CompanyRatio;
};