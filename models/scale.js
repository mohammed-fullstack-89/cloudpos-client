'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Scale extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {


            this.hasOne(models.item, {

            })


        }
    };
    Scale.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        end: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        end: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        number_of_digits: { type: DataTypes.STRING, defualtValue: null, allowNull: true },


    }, {
        sequelize,
        modelName: 'scale',
    });
    return Scale;
};