var orm = require('../db.manager')
    , Seq = orm.Seq();

module.exports = {
    model: {

        id: { type: BIGINT(20), primaryKey: true, autoIncrement: true },
        item_id: { type: BIGINT(20), defaultValue: null, allowNull: true },
        item_alternative_id: { type: BIGINT(20), defaultValue: null, allowNull: true },
    },
}