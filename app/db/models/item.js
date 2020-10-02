
var orm = require('./index')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: Seq.STRING, allowNull: true, defaultValue: null },
        name_en: { type: Seq.STRING, allowNull: true, defaultValue: null },
        trade_name_ar: { type: Seq.STRING, allowNull: true, defaultValue: null },
        trade_name_en: { type: Seq.STRING, allowNull: true, defaultValue: null },
        scientific_name_ar: { type: Seq.STRING, allowNull: true, defaultValue: null },
        scientific_name_en: { type: Seq.STRING, allowNull: true, defaultValue: null },
        brief_name_ar: { type: Seq.STRING, allowNull: true, defaultValue: null },
        brief_name_en: { type: Seq.STRING, allowNull: true, defaultValue: null },
        description: { type: Seq.TEXT, allowNull: true, defaultValue: null },
        category_id: { type: Seq.BIGINT, allowNull: true, defaultValue: null },
    },

    relations: [{

        type: 'belongsToMany',
        related_to: 'suppliers',
        relationOptions: {
            as: 'get_suppliers',
            through: 'items_suppliers',
            foreignKey: 'item_id',
            otherKey: 'supplier_id',
        },
    },
    {
        type: 'belongsToMany',
        related_to: 'precautions',
        relationOptions: {
            as: 'get_precautions',
            through: 'items_precautions',
            foreignKey: 'item_id',
            otherKey: 'precaution_id',
        },

    },
    {
        type: 'belongsToMany',
        related_to: 'side_effects',
        relationOptions: {
            as: 'get_side_effects',
            through: 'items_side_effects',
            foreignKey: 'item_id',
            otherKey: 'side_effect_id',
        },
    },
    {
        type: 'belongsToMany',
        related_to: 'items',
        relationOptions: {
            as: 'get_item_alternatives',
            through: 'item_alternatives',
            foreignKey: 'item_id',
            otherKey: 'item_alternative_id',
        }
    },
    {
        type: 'belongsToMany',
        related_to: 'categories',
        relationOptions: {
            as: 'get_item_categories',
            through: 'categories_items',
            foreignKey: 'item_id',
            otherKey: 'category_id',
        }
    },
    {
        type: 'hasMany',
        related_to: 'variants',
        relationOptions: {
            foreignKey: {
                field: 'item_id',
                name: 'itemId',

            },
        }
    },
    {

        type: 'hasMany',
        related_to: 'segments',
        relationOptions: {
            foreignKey: {
                field: 'item_id',
                name: 'itemId',

            },
        },
    },
    {

        type: 'hasMany',
        related_to: 'serials',
        relationOptions: {
            foreignKey: {
                field: 'item_id',
                name: 'itemId',

            },
        },
    }],
    columnsIndex: {
        indexes: [{
            name: 'items_name_ar_foreign',
            fields: [`name_ar`]
        },
        {
            name: 'items_name_en_foreign',
            fields: [`name_en`]
        }, {
            name: 'items_trade_name_ar_foreign',
            fields: [`trade_name_ar`]
        }, {
            name: 'items_trade_name_en_foreign',
            fields: [`trade_name_ar`]
        },
        {
            name: 'items_scientific_name_ar_foreign',
            fields: [`scientific_name_ar`]
        },
        {
            name: 'items_scientific_name_en_foreign',
            fields: [`scientific_name_en`]
        }]
    },

};