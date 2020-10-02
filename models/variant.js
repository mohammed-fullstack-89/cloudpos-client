'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.item, {
        type: 'belongsTo',
        foreignKey: {
          field: 'item_id',
          name: 'itemId',
        }
      }),
        this.belongsToMany(models.company, {
          through: 'variant_taxes',
          foreignKey: 'variant_id',
          otherKey: 'tax_id',
        }),

        this.belongsToMany(models.category, {

          through: 'variants_categories',
          foreignKey: 'variant_id',
          otherKey: 'category_id',
        }),

        this.hasMany(models.price, {
          // foreignKey: 'variant_id',

        }),

        this.hasMany(models.segment, {
          // foreignKey: 'variant_id',
          // otherKey: 'segment_id',
        }),

        this.hasMany(models.serial, {
          // foreignKey: 'variant_id',
          // otherKey: 'serial_id',
        });
    }
  };
  Variant.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    // trade_name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    // trade_name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    // scientific_name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    // scientific_name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    // brief_name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    // brief_name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    // description: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    // id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    nick_name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    nick_name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    barcode: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    code: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    unit_id: { type: DataTypes.BIGINT, defaultValue: null },
    brand_id: { type: DataTypes.BIGINT, defaultValue: null },
    color_id: { type: DataTypes.BIGINT, defaultValue: null },
    size_id: { type: DataTypes.BIGINT, defaultValue: null },
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
    stop_sale: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    edit_price: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    item_segmented: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    allow_discount: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    item_id: { type: DataTypes.BIGINT, defaultValue: null, allowNull: true },
    is_main_item: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    has_expire_date: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    // // side_effects: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    // // precations: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    // alternative_items_ids: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    // category_id: { type: DataTypes.BIGINT, allowNull: true, defaultValue: null },
  }, {
    sequelize,
    modelName: 'variant',
  });
  return Variant;
};