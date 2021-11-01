'use-strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Size extends Model {
        static associate(models) {
            this.hasMany(models.variant, {
                as: 'variant_size',
                foreignKey: {
                    field: 'sizeId',
                    name: 'size_id'
                }
            });
        }
    }

    Size.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true }
    }, {
        sequelize,
        underscored: true,
        modelName: 'size',
        indexes: [{
            name: 'size_name_ar_foreign',
            fields: ['name_ar']
        }, {
            name: 'size_name_en_foreign',
            fields: ['name_en']
        }]
    });
    return Size;
};
