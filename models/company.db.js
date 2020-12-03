'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {

    static associate(models) {

      this.belongsToMany(models.ratio, {
        as: 'variant_ratio',
        through: models.company_ratios,
        foreignKey: 'company_id',
      });
      this.belongsToMany(models.term, {
        as: 'variant_terms',
        through: models.company_terms,
        foreignKey: 'company_id',
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