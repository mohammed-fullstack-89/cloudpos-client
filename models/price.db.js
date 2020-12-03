'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Price extends Model {

        static associate(models) {

            this.hasOne(models.stock, {
                as: 'variant_price',
                foreignKey: {
                    name: 'price_id',
                    field: 'price_id'
                }
            })
        }
    };
    Price.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        purchasing_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
        cost_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
        sale_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
        whole_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
        variant_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        user_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        expire_date: { type: DataTypes.STRING, defualtValue: null, allowNull: true }
    }, {
        sequelize,
        modelName: 'price',
        indexes: [{
            name: 'prices_variant_id_foreign',
            fields: [`variant_id`]
        }, {
            name: 'prices_user_id_foreign',
            fields: [`user_id`]
        },]
    });
    return Price;
};