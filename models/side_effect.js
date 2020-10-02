'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SideEffect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.item, {// as: 'get_precautions',
        through: 'item_side_effects',
        foreignKey: 'precaution_id',
        otherKey: 'side_effect_id'
      });
    }
  };
  SideEffect.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true }
  }, {
    sequelize,
    modelName: 'side_effect',
  });
  return SideEffect;
};