

var orm = require('./index')
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
    relations: [{

        type: 'belongsToMany',
        related_to: 'variants',
        relationOptions: {
            // as: 'get_segments',
            through: 'variants_segments',
            foreignKey: 'segment_id',
            otherKey: 'variant_id',
        },
    },
    {

        type: 'belongsTo',
        related_to: 'items',
        relationOptions: {
            foreignKey: {
                field: 'item_id',
                name: 'itemId',

            },
        }
    }],
    columnsIndex: {
        indexes: [{
            name: 'segments_nick_name_ar_foreign',
            fields: [`nick_name_ar`]
        },
        {
            name: 'segments_nick_name_en_foreign',
            fields: [`nick_name_en`]
        }, {
            name: 'segments_barcode_foreign',
            fields: [`barcode`]
        }, {
            name: 'segments_unit_id_foreign',
            fields: [`unit_id`]
        }, {
            name: 'segments_parent_id_foreign',
            fields: [`parent_id`]
        }, {
            name: 'segments_variance_id_foreign',
            fields: [`variance_id`]
        }, {
            name: 'segments_item_id_foreign',
            fields: [`item_id`]
        }]
    }
}
