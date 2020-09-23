
var orm = require('../db.manager')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        serial: { type: Seq.STRING, defualtValue: null, allowNull: true },
        cost_price: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        sale_price: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        whole_price: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        offer_price: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        start_offer: { type: Seq.STRING, defualtValue: null, allowNull: true },
        end_offer: { type: Seq.STRING, defualtValue: null, allowNull: true },
        model: { type: Seq.STRING, defualtValue: null, allowNull: true },
        variance_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        item_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        color_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        unit_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        size_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },

    },
}
