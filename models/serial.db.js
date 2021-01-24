'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Serial extends Model {

    static associate(models) {
      this.belongsTo(models.variant, {
        foreignKey: {
          field: 'item_id',
          name: 'variantId'
        }
      });
    }
  };
  Serial.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    serial: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    cost_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    sale_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    whole_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    model: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    variant_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
    item_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
    color_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    unit_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    size_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    user_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
    serial_qty: { type: DataTypes.BIGINT, defaultValue: 0, allowNull: false },
  }, {
    sequelize,
    modelName: 'serial',
    indexes: [{
      name: 'serials_serial_foreign',
      fields: [`serial`]
    },
    {
      name: 'serials_model_foreign',
      fields: [`model`]
    }, {
      name: 'serials_size_id_foreign',
      fields: [`size_id`]
    }, {
      name: 'serials_unit_id_foreign',
      fields: [`unit_id`]
    }, {
      name: 'serials_color_id_foreign',
      fields: [`color_id`]
    }, {
      name: 'serials_variant_id_foreign',
      fields: [`variant_id`]
    }, {
      name: 'serials_item_id_foreign',
      fields: [`item_id`]
    },
    ]
  });
  return Serial;
};