const { Model, DataTypes } = require("sequelize");

class Customer extends Model { }

Customer.init({

    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    nick_name: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    phone_number_1: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    phone_number_2: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    email: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    customer_type: { type: DataTypes.ENUM('individual', 'entity'), allowNull: false },
    allow_discount: { type: DataTypes.TINYINT(4), defualtValue: null, allowNull: true },
    discount_value: { type: DataTypes.DOUBLE(10, 4), defualtValue: null, allowNull: true },
    discount_type: { type: Seq.ENUM('percentage', 'value', 'undefined'), allowNull: false },
    ban_customer: { type: DataTypes.TINYINT(4), defualtValue: null, allowNull: true },
    ban_customer_reasons: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    allow_tax_exemption: { type: DataTypes.TINYINT(4), defualtValue: null, allowNull: true },
    tax_exemption_number: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
    debit_limit: { type: DataTypes.DOUBLE(10, 4), defualtValue: null, allowNull: true },
    tier_id: { type: DataTypes.BIGINT(20), defualtValue: null, allowNull: true },
    upload_file: { type: DataTypes.TEXT, allowNull: true },
    note: { type: DataTypes.TEXT, allowNull: true, }
}, { sequelize: db, modelName: 'customer', charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci', indexes: [{ name: 'customers_tier_id_foreign', fields: ['tier_id'] }] })

module.exports = Customer