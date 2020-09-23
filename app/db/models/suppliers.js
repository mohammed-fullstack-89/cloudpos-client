
var orm = require('../db.manager')
    , Seq = orm.Seq();

module.exports = {
    model: {

        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
        name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },
        mobile: { type: Seq.INTEGER, defualtValue: null, allowNull: true },
        mobile2: { type: Seq.INTEGER, defualtValue: null, allowNull: true },
        email: { type: Seq.STRING, defualtValue: null, allowNull: true },
        address: { type: Seq.STRING, defualtValue: null, allowNull: true },
        discount_type: { type: Seq.ENUM('percentage', 'value', 'undefined'), allowNull: false },
        discount_value: { type: Seq.STRING, defualtValue: null, allowNull: true },
        description: { type: Seq.STRING, defualtValue: null, allowNull: true },

    },
    relations: [{

        type: 'belongsToMany',
        related_to: 'items',
        relationOptions: {
            // as: 'get_suppliers',
            through: 'items_suppliers',
            foreignKey: 'supplier_id',
            otherKey: 'item_id',
        },
    }],
}
