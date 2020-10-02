var orm = require('./index')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: Seq.STRING, defualtValue: null, allowNull: true },
        nick_name: { type: Seq.STRING, defualtValue: null, allowNull: true },
        phone_number_1: { type: Seq.STRING, defaultValue: null, allowNull: true },
        phone_number_2: { type: Seq.STRING, allowNull: true },
        email: { type: Seq.STRING, defualtValue: null, allowNull: true },
        customer_type: { type: Seq.ENUM('individual', 'entity'), defualtValue: null, allowNull: false },
        discount_type: { type: Seq.ENUM('percentage', 'value', 'undefined'), defualtValue: null, allowNull: true },
        discount_value: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        allow_discount: { type: Seq.BIGINT, defualtValue: 0, allowNull: true },
        ban_customer: { type: Seq.BIGINT, defualtValue: 0, allowNull: true },
        ban_customer_reasons: { type: Seq.STRING, defualtValue: null, allowNull: true },
        allow_tax_exemption: { type: Seq.BIGINT, defualtValue: 0, allowNull: true },
        tax_exemption_number: { type: Seq.BIGINT, defualtValue: 0, allowNull: true },
        tier_id: { type: Seq.BIGINT, defualtValue: null, allowNull: true },
        upload_file: { type: Seq.BLOB, defualtValue: null, allowNull: true },
        note: { type: Seq.TEXT, defualtValue: null, allowNull: true },
    },
    relations: [

        {
            type: 'belongsTo',
            related_to: 'customer_tiers',
            relationOptions: {
                foreignKey: {
                    field: 'tier_id',
                    name: 'tierId',
                },
                as: 'get_customer_tier'
            }
        },

        {
            type: 'hasMany',
            related_to: 'customer_addresses',
            relationOptions: {
                as: 'get_customer_address',
                foreignKey: {
                    field: 'customer_id',
                    name: 'customerId',


                }

            }

        },
        {
            type: 'belongsToMany',
            related_to: 'entities',
            relationOptions: {
                as: 'Customers',
                through: 'entities_customers',
                foreignKey: 'customer_id',
                otherKey: 'entity_id',
            },


        }

    ],
    columnsIndex: {
        indexes: [{
            name: 'customers_name_foreign',
            fields: [`name`]
        }, {
            name: 'customers_phone_number_1_foreign',
            fields: [`phone_number_1`]
        }, {
            name: 'customers_phone_number_2_foreign',
            fields: [`phone_number_2`]
        },
            // {
            //     name: 'customers_tier_id_foreign',
            //     fields: [`tier_id`]
            // }
        ]
    },

}

