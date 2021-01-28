'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ratio extends Model {
    static associate(models) {
      this.belongsToMany(models.company, {
        as: 'company_ratio',
        through: models.company_ratios,
        foreignKey: 'ratio_id',
        otherKey: 'company_id'
      })
    }
  };
  Ratio.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: false },
  }, {
    sequelize,
    underscored: true,
    modelName: 'ratio',
    indexes: [{
      name: 'ratios_value_foreign',
      fields: [`value`]
    }]
  });
  return Ratio;
};