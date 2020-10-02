'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Term extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.company, {
        // as: 'get_term',
        through: models.company_terms,
        foreignKey: 'term_id',
      });
    }
  };
  Term.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_en: { type: DataTypes.STRING, defualtValue: true, allowNull: true },
    name_ar: { type: DataTypes.STRING, defualtValue: true, allowNull: true },
  }, {
    sequelize,
    modelName: 'term',
  });
  return Term;
};