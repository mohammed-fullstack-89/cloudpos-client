'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.category, {

      //   foreignKey: 'parent'
      // });


      this.belongsToMany(models.variant, {
        as: 'variant_item_categories',
        through: models.variant_categories,
        foreignKey: 'category_id',
        otherKey: { name: 'item_id', field: 'item_id' },


      });

      this.belongsTo(models.tax, {
        as: 'category_tax',
        foreignKey: {
          name: 'categoryTaxId',
          field: 'tax_id'
        }
      })
      // this.hasMany(models.variant, {
      //   as: 'main_category',
      //   foreignKey: { name: 'categoryId', field: 'category_id' },

      // })
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
    branch_id: { type: DataTypes.BIGINT, allowNull: true },
    // tax_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    printer_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
    parent: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },

  }, {
    sequelize,
    modelName: 'category',
    indexes: [{
      name: 'categories_branch_id_foreign',
      fields: [`branch_id`]
    }, {
      name: 'categories_tax_id_foreign',
      fields: [`tax_id`]
    }, {
      name: 'categories_printer_id_foreign',
      fields: [`printer_id`]
    }, {
      name: 'categories_parent_foreign',
      fields: [`parent`]
    }]
  });
  return Category;
};