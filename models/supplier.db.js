'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {

    static associate(models) {
      this.belongsToMany(models.variant, {
        as: 'item_suppliers',
        through: models.variant_suppliers,
        foreignKey: 'supplier_id',
        otherKey: { name: 'variant_id', field: 'item_id' },
      })
    }
  };
  Supplier.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    mobile_1: { type: DataTypes.INTEGER, defualtValue: null, allowNull: true },
    mobile_2: { type: DataTypes.INTEGER, defualtValue: null, allowNull: true },
    email: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    address: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    discount_type: { type: DataTypes.ENUM('percentage', 'value', 'undefined'), allowNull: true },
    discount_value: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    creditor: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    debtor: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    note: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    lat: { type: DataTypes.DOUBLE, defualtValue: 0.0, allowNull: true },
    long: { type: DataTypes.DOUBLE, defualtValue: 0.0, allowNull: true }

  }, {
    sequelize,
    modelName: 'supplier',
    indexes: [{
      name: 'suppliers_name_ar_foreign',
      fields: [`name_ar`]
    },
    {
      name: 'suppliers_name_en_foreign',
      fields: [`name_en`]
    }, {
      name: 'suppliers_mobile_foreign',
      fields: [`mobile_1`]
    }, {
      name: 'suppliers_mobile2_foreign',
      fields: [`mobile_2`]
    }, {
      name: 'suppliers_email_foreign',
      fields: [`email`]
    }, {
      name: 'suppliers_address_foreign',
      fields: [`address`]
    }]
  });
  return Supplier;
};