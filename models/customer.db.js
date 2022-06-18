"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      this.belongsTo(models.tier, {
        foreignKey: { field: 'tier_id', name: 'tierId' },
        as: 'customer_tier'
      });

      this.hasMany(models.address, {
        foreignKey: 'customer_id',
        as: 'customer_addresses'
      });

      this.hasOne(models.price_list, {
        foreignKey: 'customer_id',
        as: 'customer_price_list'
      });

      this.belongsToMany(models.entity, {
        as: 'customer_entities',
        through: models.customer_entity,
        foreignKey: 'customer_id',
        otherKey: { name: 'entity_id', field: 'entity_id' }
      });
    }
  }

  Customer.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    nick_name: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    mobile_1: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    mobile_2: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    customer_type: { type: DataTypes.ENUM('individual', 'entity'), defualtValue: null, allowNull: true },
    discount_type: { type: DataTypes.ENUM('percentage', 'value', 'undefined'), defualtValue: null, allowNull: true },
    max_debit: { type: DataTypes.DOUBLE, defualtValue: null, allowNull: true },
    debtor: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    creditor: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    discount_value: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    ref_number: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    ban_customer: { type: DataTypes.BIGINT, defualtValue: 0, allowNull: true },
    ban_customer_reasons: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    tax_exemption_number: { type: DataTypes.BIGINT, defualtValue: 0, allowNull: true },
    tier_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    file: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    note: { type: DataTypes.TEXT, defualtValue: null, allowNull: true },
    anniversary: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    dob: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    gender: { type: DataTypes.STRING, defualtValue: null, allowNull: true }
  }, {
    sequelize,
    underscored: true,
    modelName: 'customer',
    indexes: [{
      name: 'customers_name_foreign',
      fields: ['name']
    }, {
      name: 'customers_phone_number_1_foreign',
      fields: ['mobile_1']
    }, {
      name: 'customers_phone_number_2_foreign',
      fields: ['mobile_2']
    }, {
      name: 'customers_nick_name_foreign',
      fields: ['nick_name']
    }, {
      name: 'customers_tier_id_foreign',
      fields: ['tier_id']
    }]
  });
  return Customer;
};