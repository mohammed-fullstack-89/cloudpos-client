'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ratio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.company, {
        as: 'get_ratio',
        through: models.company_ratios,
        foreignKey: 'ratio_id',
      })
    }
  };
  Ratio.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: false },
  }, {
    sequelize,
    modelName: 'ratio',
    indexes: [{
      name: 'ratios_value_foreign',
      fields: [`value`]
    },
    ]
  });
  return Ratio;
};