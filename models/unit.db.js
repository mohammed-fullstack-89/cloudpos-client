'use-strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Unit extends Model {
        static associate(models) {
            this.hasMany(models.variant, {
                as: 'variant_unit',
                foreignKey: {
                    field: 'unitId',
                    name: 'unit_id'
                }
            });
        }
    }

    Unit.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        name_en: { type: DataTypes.STRING, defualtValue: null, allowNull: true }
    }, {
        sequelize,
        underscored: true,
        modelName: 'unit',
        indexes: [{
            name: 'unit_name_ar_foreign',
            fields: ['name_ar']
        }, {
            name: 'unit_name_en_foreign',
            fields: ['name_en']
        }]
    });
    return Unit;
};
