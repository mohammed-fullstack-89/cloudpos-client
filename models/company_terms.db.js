'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CompanyTerms extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CompanyTerms.belongsTo(models.company, { foreignKey: 'company_id', targetKey: 'id' });
            CompanyTerms.belongsTo(models.term, { foreignKey: 'term_id', targetKey: 'id' });

        }
    };
    CompanyTerms.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        company_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'company',
                key: 'id'
            },
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
            unique: 'unique-genre-per-company'
        },
        term_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'term',
                key: 'id'
            },
            // onDelete: 'cascade',
            // onUpdate: 'cascade',
            unique: 'unique-genre-per-term'
        },

    }, {
        sequelize,
        modelName: 'company_terms',
    });
    return CompanyTerms;
};