
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
        related_to: 'variants',
        relationOptions: {
            // as: 'get_suppliers',
            through: 'variants_suppliers',
            foreignKey: 'supplier_id',
            otherKey: 'variant_id',
        },
    }],
    columnsIndex: {
        indexes: [{
            name: 'suppliers_name_ar_foreign',
            fields: [`name_ar`]
        },
        {
            name: 'suppliers_name_en_foreign',
            fields: [`name_en`]
        }, {
            name: 'suppliers_mobile_foreign',
            fields: [`mobile`]
        }, {
            name: 'suppliers_mobile2_foreign',
            fields: [`mobile2`]
        }, {
            name: 'suppliers_email_foreign',
            fields: [`email`]
        }, {
            name: 'suppliers_address_foreign',
            fields: [`address`]
        }]
    }
}
