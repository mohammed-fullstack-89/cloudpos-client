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

            this.belongsTo(models.variance, {
                as: 'get_prices',
                foreignKey: {
                    field: 'variance_id', name: 'varianceId',
                }
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
        item_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        segment_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        variance_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        branch_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        store_id: { type: DataTypes.BIGINT, defualtValue: null, allowNull: true },
        expire_date: { type: DataTypes.STRING, defualtValue: null, allowNull: true }
    }, {
        sequelize,
        modelName: 'price',
        indexes: [{
            name: 'prices_item_id_foreign',
            fields: [`item_id`]
        }, {
            name: 'prices_variance_id_foreign',
            fields: [`variance_id`]
        }, {
            name: 'prices_store_id_foreign',
            fields: [`store_id`]
        }, {
            name: 'prices_branch_id_foreign',
            fields: [`branch_id`]
        }]
    });
    return Price;
};