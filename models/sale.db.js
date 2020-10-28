'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sale extends Model {

        static associate(models) {



        }
    }
    // Sale.removeAttribute("id");

    Sale.init({
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, },
        data: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
        invoice_number: {
            type: DataTypes.BIGINT, allowNull: false, unique: 'compositeIndex', onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        order_number: {
            type: DataTypes.BIGINT, allowNull: false, unique: 'compositeIndex', onDelete: 'cascade',
        },
        user_id: { type: DataTypes.BIGINT, allowNull: false },
        customer_id: { type: DataTypes.BIGINT, allowNull: false },
        order_type: {
            type: DataTypes.ENUM('takeaway', 'delivery', 'pick_up', 'dine_in', 'not_specified'), defaultValue: "not_specified", allowNull: false
        },
        status: { type: DataTypes.ENUM('pending', 'failure', 'success'), defaultValue: 'pending', allowNull: false }
    }, {
        sequelize,
        modelName: 'sale',

    }, {

    });
    return Sale;
};