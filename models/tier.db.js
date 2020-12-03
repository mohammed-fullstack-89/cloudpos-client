'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tier extends Model {

    static associate(models) {
      this.hasOne(models.customer, {
        foreignKey: {
          field: 'tier_id',
          name: 'tierId',
        },

      });

    }
  };
  Tier.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    allow_discount: { type: DataTypes.TINYINT, defualtValue: 0, allowNull: true },
    discount_type: { type: DataTypes.ENUM('percentage', 'value', 'undefined'), allowNull: true },
    discount_value: { type: DataTypes.DOUBLE, defualtValue: null, allowNull: true },
  }, {
    sequelize,
    modelName: 'tier',
    indexes: [{
      name: 'customers_tiers_name_ar_foreign',
      fields: [`name_ar`]
    }, {
      name: 'customers_tiers_name_en_foreign',
      fields: [`name_en`]
    }]
  });
  return Tier;
};