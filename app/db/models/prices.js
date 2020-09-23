var orm = require('../db.manager')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        qty: { type: Seq.STRING, defualtValue: null, allowNull: true },
        qty_in: { type: Seq.STRING, defualtValue: null, allowNull: true },
        purchasing_price: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        cost_price: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        sale_price: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        whole_price: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        offer_price: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        start_offer: { type: Seq.STRING, defualtValue: null, allowNull: true },
        end_offer: { type: Seq.STRING, defualtValue: null, allowNull: true },
        item_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        variance_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        branch_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        store_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        expire_date: { type: Seq.STRING, defualtValue: null, allowNull: true },

    },

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
        }, {
            name: 'customers_tier_id_foreign',
            fields: [`tier_id`]
        }]
    },

}

