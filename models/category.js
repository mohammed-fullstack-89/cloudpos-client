'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.category, {
        foreignKey: 'parent'
      });

      this.belongsToMany(models.variant, {
        through: 'variants_categories',
        foreignKey: 'category_id',
        otherKey: 'variant_id',
      });

    }
  };
  Category.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    description: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true },
    discount_type: { type: DataTypes.ENUM('percentage', 'value', 'undefined'), allowNull: true },
    discount_value: { type: DataTypes.DOUBLE, defualtValue: null, allowNull: true },
    branch_id: { type: DataTypes.BIGINT, allowNull: false },
    tax_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    printer_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    parent: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },

  }, {
    sequelize,
    modelName: 'category',
  });
  return Category;
};