'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Segment extends Model {

    static associate(models) {
      this.belongsTo(models.variant, {
        as: 'variant_segment',
        foreignKey: {
          field: 'variant_id', name: 'variantId',
        }
      });

      this.hasOne(models.stock, {
        as: 'stock',
        foreignKey: {
          field: 'segment_id',
          name: 'segment_id',
        }

      })
    }
  };
  Segment.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    qty: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    barcode: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    sale_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
    unit_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    parent_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    variant_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    location_id: { type: DataTypes.BIGINT, allowNull: false },
    item_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
  }, {
    sequelize,
    underscored: true,
    modelName: 'segment',
    indexes: [{
      name: 'segments_name_ar_foreign',
      fields: [`name_ar`]
    },
    {
      name: 'segments_name_en_foreign',
      fields: [`name_en`]
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
      name: 'segments_variant_id_foreign',
      fields: [`variant_id`]
    }, {
      name: 'segments_item_id_foreign',
      fields: [`item_id`]
    }]
  });
  return Segment;
};