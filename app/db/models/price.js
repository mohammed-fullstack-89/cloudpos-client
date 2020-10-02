var orm = require('./index')
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
    relations: [{


        type: 'hasMany',
        related_to: 'prices',
        relationOptions: {
            as: 'get_prices',
            foreignKey: 'price_id',
            otherKey: 'variant_id',
        },

    }],
    columnsIndex: {
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
    },

}

