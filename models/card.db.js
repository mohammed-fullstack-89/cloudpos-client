'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {

    static associate(models) {

    }
  };
  Card.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    image: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    is_active: { type: DataTypes.ENUM('active', 'inactive'), allowNull: true }
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