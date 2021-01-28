'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Term extends Model {
    static associate(models) {
      this.belongsToMany(models.company, {
        as: 'company_terms',
        through: models.company_term,
        foreignKey: 'term_id',
        otherKey: 'company_id'
      });
    }
  };
  Term.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_en: { type: DataTypes.STRING, defualtValue: true, allowNull: true },
    name_ar: { type: DataTypes.STRING, defualtValue: true, allowNull: true },
  }, {
    sequelize,
    underscored: true,
    modelName: 'term',

    indexes: [{
      name: 'terms_name_ar_foreign',
      fields: [`name_ar`]
    },
    {
      name: 'terms_name_en_foreign',
      fields: [`name_en`]
    }]
  });
  return Term;
};