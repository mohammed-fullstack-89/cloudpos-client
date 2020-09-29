var orm = require("../db.manager")
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
        name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },
        allow_discount: { type: Seq.TINYINT, defualtValue: 0, allowNull: true },
        discount_type: { type: Seq.ENUM('percentage', 'value', 'undefined'), allowNull: true },
        discount_value: { type: Seq.DOUBLE, defualtValue: null, allowNull: true },
        allow_tax_exemption: { type: Seq.BIGINT, defualtValue: null, allowNull: true },
        tax_exemption_number: { type: Seq.BIGINT, defualtValue: null, allowNull: true },

    },
    relations: [{
        type: "belongsToMany",
        related_to: "customers",
        relationOptions: {
            as: 'get_customer_entity',
            through: 'entites_customers',
            foreignKey: 'entity_id',
            otherKey: 'customer_id',
        }

    }],
    columnsIndex: {
        indexes: [{
            name: 'customers_entities_name_ar_foreign',
            fields: [`name_ar`]
        }, {
            name: 'customers_entities_name_en_foreign',
            fields: [`name_en`]
        }]
    },

}

