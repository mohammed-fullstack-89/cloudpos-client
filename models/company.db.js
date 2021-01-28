'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {

    static associate(models) {

      this.belongsToMany(models.ratio, {
        as: 'company_ratio',
        through: models.company_ratios,
        foreignKey: 'company_id',
        otherKey: { name: 'ratio_id', field: 'ratio_id' },

      });
      this.belongsToMany(models.term, {
        as: 'company_terms',
        through: models.company_term,
        foreignKey: 'company_id',
        otherKey: { name: 'term_id', field: 'term_id' },
      });

    }
  };
  Company.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    mobile: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    phone: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    fax: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    email: { type: DataTypes.STRING, defualtValue: null, allowNull: true }
  }, {
    sequelize,
    underscored: true,
    modelName: 'company',
    indexes: [{
      name: 'companies_name_ar_foreign',
      fields: [`name_ar`]
    },
    {
      name: 'companies_name_en_foreign',
      fields: [`name_en`]
    }]
  });
  return Company;
};