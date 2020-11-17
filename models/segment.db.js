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
      this.belongsTo(models.variance, {
        foreignKey: {
          field: 'variance_id', name: 'varianceId',
        }
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
    unit_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    parent_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    variance_id: { type: DataTypes.BIGINT, allowNull: false },
    item_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
  }, {
    sequelize,
    modelName: 'segment',
    indexes: [{
      name: 'segments_nick_name_ar_foreign',
      fields: [`nick_name_ar`]
    },
    {
      name: 'segments_nick_name_en_foreign',
      fields: [`nick_name_en`]
    }, {
      name: 'segments_barcode_foreign',
      fields: [`barcode`]
    }, {
      name: 'segments_unit_id_foreign',
      fields: [`unit_id`]
    }, {
      name: 'segments_parent_id_foreign',
      fields: [`parent_id`]
    }, {
      name: 'segments_variance_id_foreign',
      fields: [`variance_id`]
    }, {
      name: 'segments_item_id_foreign',
      fields: [`item_id`]
    }]
  });
  return Segment;
};