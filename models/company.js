'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.ratio, {
        through: models.company_ratios,
        foreignKey: 'company_id',
      });
      this.belongsToMany(models.term, {
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
  });
  return Company;
};