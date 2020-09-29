
var orm = require('../db.manager')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
        name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },
        type: { type: Seq.INTEGER, defualtValue: null, allowNull: true }

    },
    relations: [{
        type: 'belongsToMany',
        related_to: 'taxes',
        relationOptions: {
            as: 'get_taxes',
            through: 'variants_taxes',
            foreignKey: 'tax_id',
            otherKey: 'variant_id',
        },
    },],
    columnsIndex: {
        indexes: [{
            name: 'taxes_name_ar_foreign',
            fields: [`name_ar`]
        },
        {
            name: 'taxes_name_en_foreign',
            fields: [`name_en`]
        }, {
            name: 'taxes_type_foreign',
            fields: [`type`]
        }]
    }

}
