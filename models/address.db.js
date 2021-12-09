"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      this.belongsTo(models.customer, {
        foreignKey: 'customer_id',
        as: 'customer_addresses'
      });
    }
  }

  Address.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    location: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    governorate: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    zone: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    home_number: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    street: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    building: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    floor: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    lat: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    long: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    customer_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    delivery_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    address_des: { type: DataTypes.STRING, defaultValue: '', allowNull: true },
    status: { type: DataTypes.ENUM('active', 'inactive'), defualtValue: null, allowNull: false }
  }, {
    sequelize,
    underscored: true,
    modelName: 'address'
  });
  return Address;
};