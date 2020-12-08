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
    location: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    governorate: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    zone: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    // status: { type: DataTypes.TINYINT, defualtValue: 1, allowNull: false },
    home_number: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    street: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    building: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    floor: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    lat: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    long: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    customer_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true, }
  }, {
    sequelize,
    modelName: 'address',
  });
  return Address;
};