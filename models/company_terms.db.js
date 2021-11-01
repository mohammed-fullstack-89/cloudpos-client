"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CompanyTerms extends Model {
        static associate(models) {
            CompanyTerms.belongsTo(models.company, { foreignKey: 'company_id', targetKey: 'id', as: 'company' });
            CompanyTerms.belongsTo(models.term, { foreignKey: 'term_id', targetKey: 'id', as: 'term' });
        }
    }

    CompanyTerms.init({
        company_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'company',
                key: 'id'
            }
        },
        term_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'term',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'company_term'
    });
    return CompanyTerms;
};