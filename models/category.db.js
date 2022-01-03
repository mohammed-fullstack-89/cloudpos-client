"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsToMany(models.variant, {
        as: 'variant_category',
        through: models.variant_categories,
        foreignKey: 'category_id',
        otherKey: { name: 'item_id', field: 'item_id' }
      });

      this.hasMany(models.variant, {
        as: 'main_category',
        foreignKey: 'category_id'
      });
    }
  }

  Category.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    description: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
    discount_type: { type: DataTypes.STRING, allowNull: true },
    discount_value: { type: DataTypes.DOUBLE, defualtValue: null, allowNull: true },
    parent: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    printers: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    show_category_in_staff: { type: DataTypes.TINYINT, defualtValue: 0, allowNull: false }
  }, {
    sequelize,
    underscored: true,
    modelName: 'category',
    indexes: [{
      name: 'categories_parent_foreign',
      fields: ['parent']
    }]
  });
  return Category;
};