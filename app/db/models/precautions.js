
var orm = require('../db.manager')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
        name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },

    },
    relations: [{

        type: 'belongsToMany',
        related_to: 'items',
        relationOptions: {
            // as: 'get_precautions',
            through: 'items_precautions',
            foreignKey: 'precaution_id',
            otherKey: 'item_id',
        },
    }]
}
