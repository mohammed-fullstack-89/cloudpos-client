'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Serial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.variance, {
        foreignKey: {
          field: 'item_id', name: 'varianceId',
        }
        //   field: 'item_id',
        //   name: 'itemId',

        // },
      });
    }
  };
  Serial.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    serial: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    cost_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    sale_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    whole_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    offer_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    start_offer: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    end_offer: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    model: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    variance_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
    item_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
    color_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
    unit_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
    size_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
  }, {
    sequelize,
    modelName: 'serial',
  });
  return Serial;
};