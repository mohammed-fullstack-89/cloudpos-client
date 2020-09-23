

var orm = require('../db.manager')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
        name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },
        card_image: { type: Seq.STRING, defualtValue: null, allowNull: true },


    },

    columnsIndex: {
        indexes: [{
            name: 'cards_name_ar_foreign',
            fields: [`name_ar`]
        },
        {
            name: 'cards_name_en_foreign',
            fields: [`name_en`]
        }]
    },
}
