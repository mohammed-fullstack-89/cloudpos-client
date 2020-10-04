'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsToMany(models.item, {
      //   through: 'item_taxes',
      //   foreignKey: 'tax_id',
      //   otherKey: 'item_id',
      // });

      this.belongsToMany(models.tax, {
        as: 'get_tax',
        through: models.item_taxes,
        foreignKey: 'tax_id',
        otherKey: 'item_id',
      })
    }
  };
  Tax.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    type: { type: DataTypes.INTEGER, defualtValue: null, allowNull: true }

  }, {
    sequelize,
    modelName: 'tax',
  });
  return Tax;
};