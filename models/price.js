'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Price extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            this.belongsTo(models.item, {
                as: 'get_prices',

                foreignKey:
                    'item_id'
            })
        }
    };
    Price.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        qty: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        qty_in: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        purchasing_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
        cost_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
        sale_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
        whole_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
        offer_price: { type: DataTypes.DOUBLE, defualtValue: 0, allowNull: true },
        start_offer: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        end_offer: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        // item_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        variance_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        branch_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        store_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        expire_date: { type: DataTypes.STRING, defualtValue: null, allowNull: true }
    }, {
        sequelize,
        modelName: 'price',
    });
    return Price;
};