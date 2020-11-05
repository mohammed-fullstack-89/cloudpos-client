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

            this.hasMany(models.variance, {
                as: 'get_scale_barcode',
                foreignKey: {
                    field: 'scale_id', name: 'scaleId',
                }
            })


        }
    };
    Scale.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        start: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        end: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        number_of_digits: { type: DataTypes.BIGINT, allowNull: true },
        has_serial: { type: DataTypes.TINYINT, allowNull: true },
        precations: { type: DataTypes.TINYINT, allowNull: true },
        side_effects: { type: DataTypes.STRING, allowNull: true },


    }, {
        sequelize,
        modelName: 'scale',
    });
    return Scale;
};