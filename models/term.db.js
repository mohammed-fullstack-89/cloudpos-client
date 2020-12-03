'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Term extends Model {
    static associate(models) {
      this.belongsToMany(models.company, {
        // as: 'variant_term',
        through: models.company_terms,
        foreignKey: 'term_id',
      });
    }
  };
  Term.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_en: { type: DataTypes.STRING, defualtValue: true, allowNull: true },
    name_ar: { type: DataTypes.STRING, defualtValue: true, allowNull: true },
  }, {
    sequelize,
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