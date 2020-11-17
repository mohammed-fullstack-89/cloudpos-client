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
      this.belongsToMany(models.variance, {
        as: 'get_suppliers',
        through: models.variance_suppliers,
        foreignKey: 'supplier_id',
        otherKey: { name: 'variance_id', field: 'item_id' },
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
    indexes: [{
      name: 'suppliers_name_ar_foreign',
      fields: [`name_ar`]
    },
    {
      name: 'suppliers_name_en_foreign',
      fields: [`name_en`]
    }, {
      name: 'suppliers_mobile_foreign',
      fields: [`mobile`]
    }, {
      name: 'suppliers_mobile2_foreign',
      fields: [`mobile2`]
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