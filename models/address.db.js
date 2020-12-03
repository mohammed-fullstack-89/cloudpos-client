'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {

    static associate(models) {
      this.belongsTo(models.customer, {
        foreignKey: {
          field: 'customer_id',
          name: 'customerId',
        }
      });
    }
  };
  Address.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    address: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    governorate: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    zone: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    email: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    street: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    building: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    floor: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    office_flat_number: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    longitude: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    latitude: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    customer_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true, }
  }, {
    sequelize,
    modelName: 'address',
  });
  return Address;
};