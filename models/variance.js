'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.supplier, {
        as: 'get_suppliers',
        through: models.variance_suppliers,
        foreignKey: 'item_id',
      })

      this.belongsToMany(models.tax, {
        as: 'get_tax',
        through: models.variance_taxes,
        foreignKey: 'item_id',

      })
      this.belongsToMany(models.variance, {
        as: 'items',
        through: models.variance_alternatives,
        foreignKey: 'alternative_id',
        otherKey: { name: 'variance_id', field: 'item_id' },

      })
      this.belongsToMany(models.variance, {
        as: 'alternatives',
        through: models.variance_alternatives,
        foreignKey: 'item_id',
      })

      this.belongsToMany(models.category, {
        as: 'get_item_categories',
        through: models.variance_categories,
        foreignKey: 'item_id',
      })
      this.belongsTo(models.scale, {
        as: 'get_scale_barcode',
        foreignKey: {
          field: 'scale_id', name: 'scaleId',
        }
      })

      // this.belongsTo(models.category, {

      //   foreignKey: { name: 'categoryId', field: 'category_id' },

      // })
      // this.hasMany(models.variance, {
      //   // foreignKey: {
      //   //   field: 'variance_id',
      //   //   name: 'varianceId',
      //   // }
      // })
      this.hasMany(models.segment, {
        as: 'get_segment',
        foreignKey: {
          field: 'variance_id',
          name: 'varianceId'
        }
        // foreignKey: {
        //   field: 'variance_id',
        //   name: 'varianceId',
        // }
      })
      this.hasMany(models.serial, {
        as: 'get_serials',
        foreignKey: {
          field: 'variance_id',
          name: 'varianceId'
        }
        // foreignKey: 'variance_id',
        // foreignKey: {
        //   field: 'variance_id',
        //   name: 'varianceId',
        // }
      })
      this.hasMany(models.price, {
        as: 'get_prices',
        foreignKey: {
          field: 'variance_id',
          name: 'varianceId'
        }
        //  foreignKey: 'variance_id' 

        //   field: 'variance_id',
        //   name: 'varianceId',
        // }
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
    color_box: { type: DataTypes.STRING, defaultValue: null, allowNull: true }
  }, {
    sequelize,
    modelName: 'variance',
  });
  return Item;
};