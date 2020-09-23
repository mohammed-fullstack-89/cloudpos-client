

var orm = require('../db.manager')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        qty: { type: Seq.STRING, defualtValue: null, allowNull: true },
        nick_name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
        nick_name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },
        barcode: { type: Seq.STRING, defualtValue: null, allowNull: true },
        sale_price: { type: Seq.DOUBLE, defualtValue: 0, allowNull: true },
        unit_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        parent_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        variance_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },
        item_id: { type: Seq.BIGINT, defualtValue: null, allowNull: false },

    },
}
