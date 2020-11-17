'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Card.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    card_image: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
  }, {
    sequelize,
    modelName: 'card',
    indexes: [{
      name: 'cards_name_ar_foreign',
      fields: [`name_ar`]
    },
    {
      name: 'cards_name_en_foreign',
      fields: [`name_en`]
    }]
  });
  return Card;
};