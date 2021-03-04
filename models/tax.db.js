'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {

    static associate(models) {

      this.belongsToMany(models.variant, {
        as: 'variant_tax',
        through: models.variant_taxes,
        foreignKey: 'tax_id',
        otherKey: { name: 'item_id', field: 'item_id' },


      })
      // this.hasOne(models.category, {
      //   as: 'category_tax',
      //   foreignKey: {
      //     name: 'tax_id',
      //     field: 'tax_id',
      //   },
      //   sourceKey: 'id'
      // })
    }
  };
  Tax.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    percentage: { type: DataTypes.INTEGER, defualtValue: 0 },
    type: { type: DataTypes.INTEGER, defualtValue: null, allowNull: true }

  }, {
    sequelize,
    underscored: true,
    modelName: 'tax',
    indexes: [{
      name: 'taxes_name_ar_foreign',
      fields: [`name_ar`]
    },
    {
      name: 'taxes_name_en_foreign',
      fields: [`name_en`]
    }, {
      name: 'taxes_type_foreign',
      fields: [`type`]
    }]

  });
  return Tax;
};