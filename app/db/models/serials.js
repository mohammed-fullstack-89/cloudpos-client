
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
    relations: [{

        type: 'belongsToMany',
        related_to: 'variants',
        relationOptions: {
            // as: 'get_serials',
            through: 'variants_serials',
            foreignKey: 'serial_id',
            otherKey: 'variant_id',
        },
    }],
    columnsIndex: {
        indexes: [{
            name: 'serials_serial_foreign',
            fields: [`serial`]
        },
        {
            name: 'serials_model_foreign',
            fields: [`model`]
        }, {
            name: 'serials_size_id_foreign',
            fields: [`size_id`]
        }, {
            name: 'serials_unit_id_foreign',
            fields: [`unit_id`]
        }, {
            name: 'serials_color_id_foreign',
            fields: [`color_id`]
        }, {
            name: 'serials_variance_id_foreign',
            fields: [`variance_id`]
        }, {
            name: 'serials_item_id_foreign',
            fields: [`item_id`]
        }]
    }
}
