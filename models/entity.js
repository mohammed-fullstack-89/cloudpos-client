'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsToMany(models.customer, {
        through: models.customer_entities,
        foreignKey: 'entity_id',
      });


    }
  };
  Entity.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    allow_discount: { type: DataTypes.TINYINT, defualtValue: 0, allowNull: true },
    discount_type: { type: DataTypes.ENUM('percentage', 'value', 'undefined'), allowNull: true },
    discount_value: { type: DataTypes.DOUBLE, defualtValue: null, allowNull: true },
    allow_tax_exemption: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    tax_exemption_number: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
  }, {
    sequelize,
    modelName: 'entity',
  });
  return Entity;
};