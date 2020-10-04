'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Segment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.item, {
        through: 'item_segments',
        foreignKey: 'segment_id',
        otherKey: 'item_id',
      });
    }
  };
  Segment.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    qty: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    nick_name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    nick_name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    barcode: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    sale_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    unit_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
    parent_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
    variance_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
    item_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: false },
  }, {
    sequelize,
    modelName: 'segment',
  });
  return Segment;
};