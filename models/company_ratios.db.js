"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CompanyRatio extends Model {
        static associate(models) {
            CompanyRatio.belongsTo(models.company, { foreignKey: 'company_id', targetKey: 'id' });
            CompanyRatio.belongsTo(models.ratio, { foreignKey: 'ratio_id', targetKey: 'id' });
        }
    }

    CompanyRatio.init({
        company_id: {
            type: DataTypes.BIGINT, allowNull: false, primaryKey: false,
            references: {
                model: 'company',
                key: 'id'
            }
        },
        ratio_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'ratio',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'company_ratios'
    });
    return CompanyRatio;
};