'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.variant, {
        // as: 'get_suppliers',
        through: 'variant_suppliers',
        foreignKey: 'supplier_id',
        otherKey: 'variant_id',
      })
    }
  };
  Supplier.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    mobile: { type: DataTypes.INTEGER, defualtValue: null, allowNull: true },
    mobile2: { type: DataTypes.INTEGER, defualtValue: null, allowNull: true },
    email: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    address: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    discount_type: { type: DataTypes.ENUM('percentage', 'value', 'undefined'), allowNull: true },
    discount_value: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    description: { type: DataTypes.STRING, defualtValue: null, allowNull: true },

  }, {
    sequelize,
    modelName: 'supplier',
  });
  return Supplier;
};