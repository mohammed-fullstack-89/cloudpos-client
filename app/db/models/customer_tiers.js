var orm = require("../db.manager")
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
        name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },
        allow_discount: { type: Seq.TINYINT, defualtValue: 0, allowNull: true },
        discount_type: { type: Seq.ENUM('percentage', 'value', 'undefined'),  allowNull: true },
        discount_value: { type: Seq.DOUBLE, defualtValue: null, allowNull: true },

    },
    relations: [{
        type: "hasOne",
        related_to: "customers",
        relationOptions: {
            foreignKey: {
                field: 'tier_id',
                name: 'tierId',
            },

        }
    }],
    columnsIndex: {
        indexes: [{
            name: 'customers_tiers_name_ar_foreign',
            fields: [`name_ar`]
        }, {
            name: 'customers_tiers_name_en_foreign',
            fields: [`name_en`]
        }]
    },

}

