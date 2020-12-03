'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      this.belongsToMany(models.supplier, {
        as: 'item_suppliers',
        through: models.variant_suppliers,
        foreignKey: 'item_id',
      })

      this.belongsToMany(models.tax, {
        as: 'variant_tax',
        through: models.variant_taxes,
        foreignKey: 'item_id',

      })
      this.belongsToMany(models.variant, {
        as: 'items',
        through: models.variant_alternatives,
        foreignKey: 'alternative_id',
        otherKey: { name: 'variant_id', field: 'item_id' },

      })
      this.belongsToMany(models.variant, {
        as: 'alternatives',
        through: models.variant_alternatives,
        foreignKey: 'item_id',
      })

      this.belongsToMany(models.category, {
        as: 'variant_item_categories',
        through: models.variant_categories,
        foreignKey: 'item_id',
      })

      this.belongsTo(models.scale, {
        as: 'variant_scale_barcode',
        foreignKey: {
          field: 'scale_id', name: 'scaleId',
        }
      })

      this.hasMany(models.stock, {
        as: 'stock',
        foreignKey: {
          field: 'variant_id',
          name: 'variant_id'
        }
      });

      this.hasMany(models.segment, {
        as: 'variant_segment',
        foreignKey: {
          field: 'variant_id',
          name: 'variantId'
        }
      })
      this.hasMany(models.serial, {
        as: 'variant_serials',
        foreignKey: {
          field: 'variant_id',
          name: 'variantId'
        }

      })
    }
  };
  Item.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    nick_name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    nick_name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    barcode: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    code: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    unit_id: { type: DataTypes.BIGINT, defaultValue: null },
    brand_id: { type: DataTypes.BIGINT, defaultValue: null },
    color_id: { type: DataTypes.BIGINT, defaultValue: null },
    size_id: { type: DataTypes.BIGINT, defaultValue: null },
    category_id: { type: DataTypes.BIGINT, defaultValue: null },
    column: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    row: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    shelf: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    max_order: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    min_order: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    discount_type: { type: DataTypes.ENUM('percentage', 'value', 'undefined'), allowNull: true },
    discount_value: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    max_discoun: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    commission_type: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    commission_value: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    commission_base_on: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    image: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    barcode_start: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    barcode_end: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    monitoring: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    show_in_sale_screen: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    stop_sale: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    edit_price: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    item_segmented: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    allow_discount: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    item_id: { type: DataTypes.BIGINT, defaultValue: null, allowNull: true },
    alert_on: { type: DataTypes.BIGINT, defaultValue: null, allowNull: true },
    is_main_item: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    has_expire_date: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    side_effects: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    precations: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    alternative_items_ids: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    trade_name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    trade_name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    scientific_name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    scientific_name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    brief_name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    brief_name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    description: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    has_serial: { type: DataTypes.TINYINT, defualtValue: 0 },
    color_box: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
  },
    {
      sequelize,
      modelName: 'variant',
      indexes: [{
        name: 'items_name_ar_foreign',
        fields: [`name_ar`]
      },
      {
        name: 'items_name_en_foreign',
        fields: [`name_en`]
      }, {
        name: 'items_trade_name_ar_foreign',
        fields: [`trade_name_ar`]
      }, {
        name: 'items_trade_name_en_foreign',
        fields: [`trade_name_ar`]
      },
      {
        name: 'items_scientific_name_ar_foreign',
        fields: [`scientific_name_ar`]
      },
      {
        name: 'items_scientific_name_en_foreign',
        fields: [`scientific_name_en`]
      },

      {
        name: 'items_show_in_sale_screen_foreign',
        fields: [`show_in_sale_screen`]
      },
      {
        name: 'variants_nick_name_ar_foreign',
        fields: [`nick_name_ar`]
      },
      {
        name: 'variants_nick_name_en_foreign',
        fields: [`nick_name_en`]
      },
      {
        name: 'variants_barcode_foreign',
        fields: [`barcode`]
      }, {
        name: 'variants_code_foreign',
        fields: [`code`]
      }, {
        name: 'variants_unit_id_foreign',
        fields: [`unit_id`]
      },
      {
        name: 'variants_brand_id_foreign',
        fields: [`brand_id`]
      },

      ]
    });
  return Item;
};