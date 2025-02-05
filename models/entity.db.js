"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    static associate(models) {
      this.belongsToMany(models.customer, {
        through: models.customer_entity,
        foreignKey: 'entity_id',
        otherKey: 'customer_id'
      });
    }
  }

  Entity.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    discount_type: { type: DataTypes.ENUM('percentage', 'value', 'undefined'), allowNull: true },
    discount_value: { type: DataTypes.DOUBLE, defualtValue: null, allowNull: true },
    tax_exemption_value: { type: DataTypes.STRING, defualtValue: null, allowNull: true }
  }, {
    sequelize,
    underscored: true,
    modelName: 'entity'
  });
  return Entity;
};