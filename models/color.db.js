

'use-strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Color extends Model {

        static associate(models) {

            this.hasMany(models.variant, {
                as: 'variant_color',
                foreignKey: {
                    field: 'colorId',
                    name: 'color_id'
                }
            })
        }
    }


    Color.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    }, {
        sequelize,
        underscored: true,
        modelName: 'color',
        indexes: [{
            name: 'color_name_ar_foreign',
            fields: [`name_ar`]
        }, {
            name: 'color_name_en_foreign',
            fields: [`name_en`]
        }]
    });
    return Color;
}
