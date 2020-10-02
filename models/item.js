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
        through: 'item_suppliers',
        foreignKey: 'item_id',
        otherKey: 'supplier_id',
      })
      this.belongsToMany(models.precaution, {
        through: 'item_precautions',
        foreignKey: 'item_id',
        otherKey: 'precaution_id',
      })
      this.belongsToMany(models.side_effect, {
        through: 'item_side_effects',
        foreignKey: 'item_id',
        otherKey: 'side_effect_id',
      })
      this.belongsToMany(models.item, {
        as: 'items',
        through: 'item_alternatives',
        foreignKey: 'item_id',
        otherKey: 'item_alternative_id',
      })
      this.belongsToMany(models.item, {
        as: 'alternatives',
        through: 'item_alternatives',
        foreignKey: 'item_id',
        otherKey: 'item_alternative_id',
      })
      this.belongsToMany(models.category, {
        through: 'item_categories',
        foreignKey: 'item_id',
        otherKey: 'category_id',
      })
      this.hasMany(models.variant, {
        // foreignKey: {
        //   field: 'item_id',
        //   name: 'itemId',
        // }
      })
      this.hasMany(models.segment, {
        // foreignKey: {
        //   field: 'item_id',
        //   name: 'itemId',
        // }
      })
      this.hasMany(models.serial, {
        // foreignKey: {
        //   field: 'item_id',
        //   name: 'itemId',
        // }
      })

    }
  };
  Item.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    trade_name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    trade_name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    scientific_name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    scientific_name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    brief_name_ar: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    brief_name_en: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    description: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    category_id: { type: DataTypes.BIGINT, allowNull: true, defaultValue: null }
  }, {
    sequelize,
    modelName: 'item',
  });
  return Item;
};