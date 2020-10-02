
var orm = require('./index')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: Seq.STRING, allowNull: true, defaultValue: null },
        name_en: { type: Seq.STRING, allowNull: true, defaultValue: null },
        // trade_name_ar: { type: Seq.STRING, allowNull: true, defaultValue: null },
        // trade_name_en: { type: Seq.STRING, allowNull: true, defaultValue: null },
        // scientific_name_ar: { type: Seq.STRING, allowNull: true, defaultValue: null },
        // scientific_name_en: { type: Seq.STRING, allowNull: true, defaultValue: null },
        // brief_name_ar: { type: Seq.STRING, allowNull: true, defaultValue: null },
        // brief_name_en: { type: Seq.STRING, allowNull: true, defaultValue: null },
        // description: { type: Seq.TEXT, allowNull: true, defaultValue: null },
        // id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        nick_name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
        nick_name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },
        barcode: { type: Seq.STRING, defualtValue: null, allowNull: true },
        code: { type: Seq.STRING, defualtValue: null, allowNull: true },
        unit_id: { type: Seq.BIGINT, defaultValue: null },
        brand_id: { type: Seq.BIGINT, defaultValue: null },
        color_id: { type: Seq.BIGINT, defaultValue: null },
        size_id: { type: Seq.BIGINT, defaultValue: null },
        column: { type: Seq.STRING, defualtValue: null, allowNull: true },
        row: { type: Seq.STRING, defualtValue: null, allowNull: true },
        shelf: { type: Seq.STRING, defualtValue: null, allowNull: true },
        max_order: { type: Seq.STRING, defualtValue: null, allowNull: true },
        min_order: { type: Seq.STRING, defualtValue: null, allowNull: true },
        discount_type: { type: Seq.ENUM('percentage', 'value', 'undefined'), allowNull: true },
        discount_value: { type: Seq.STRING, defualtValue: null, allowNull: true },
        max_discoun: { type: Seq.STRING, defualtValue: null, allowNull: true },
        commission_type: { type: Seq.STRING, defualtValue: null, allowNull: true },
        commission_value: { type: Seq.STRING, defualtValue: null, allowNull: true },
        commission_base_on: { type: Seq.STRING, defualtValue: null, allowNull: true },
        image: { type: Seq.STRING, defualtValue: null, allowNull: true },
        barcode_start: { type: Seq.STRING, defualtValue: null, allowNull: true },
        barcode_end: { type: Seq.STRING, defualtValue: null, allowNull: true },
        monitoring: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
        show_in_sale_screen: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
        stop_sale: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
        edit_price: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
        item_segmented: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
        allow_discount: { type: Seq.TINYINT, allowNull: true, defaultValue: 0 },
        item_id: { type: Seq.BIGINT, defaultValue: null, allowNull: true },
        is_main_item: { type: Seq.INTEGER, allowNull: true, defaultValue: 0 },
        has_expire_date: { type: Seq.INTEGER, allowNull: true, defaultValue: 0 },
        // // side_effects: { type: Seq.STRING, defualtValue: null, allowNull: true },
        // // precations: { type: Seq.STRING, defualtValue: null, allowNull: true },
        // alternative_items_ids: { type: Seq.STRING, defualtValue: null, allowNull: true },
        // category_id: { type: DataTypes.BIGINT, allowNull: true, defaultValue: null },

    },

    relations: [{
        type: "belongsTo",
        related_to: "items",
        relationOptions: {
            foreignKey: {
                field: 'item_id',
                name: 'itemId',

            }
        }
    },
    // {
    //     type: 'belongsToMany',
    //     related_to: 'suppliers',
    //     relationOptions: {
    //         as: 'get_suppliers',
    //         through: 'variants_suppliers',
    //         foreignKey: 'variant_id',
    //         otherKey: 'supplier_id',
    //     },
    // },


    // {
    //     type: 'belongsToMany',
    //     related_to: 'variants',
    //     relationOptions: {
    //         as: 'get_item_alternativs',
    //         through: 'variants_alternatives',
    //         foreignKey: 'variant_id',
    //         otherKey: 'alternative_id',
    //     },

    // },



    {
        type: 'belongsToMany',
        related_to: 'taxes',
        relationOptions: {
            as: 'get_taxes',
            through: 'variants_taxes',
            foreignKey: 'variant_id',
            otherKey: 'tax_id',
        },
    },

    {
        type: 'belongsToMany',
        related_to: 'categories',
        relationOptions: {
            as: 'get_item_categories',
            through: 'variants_categories',
            foreignKey: 'variant_id',
            otherKey: 'category_id',
        },
    },
    {
        type: 'hasMany',
        related_to: 'prices',
        relationOptions: {
            as: 'get_prices',
            foreignKey: 'variant_id',
            otherKey: 'prices_id',
        },

    }, {
        type: 'hasMany',
        related_to: 'segments',
        relationOptions: {
            as: 'get_segment',
            foreignKey: 'variant_id',
            otherKey: 'segment_id',
        },

    },
    {
        type: 'hasMany',
        related_to: 'serials',
        relationOptions: {
            as: 'get_serials',
            foreignKey: 'variant_id',
            otherKey: 'serial_id',
        },

    }


    ],
    columnsIndex: {

        indexes: [{
            name: 'variants_nick_name_ar_foreign',
            fields: [`nick_name_ar`]
        },
        {
            name: 'variants_nick_name_en_foreign',
            fields: [`nick_name_en`]
        },
        {
            name: 'variants_barcode_foreign',
            fields: [`barcode`]
        },
        {
            name: 'variants_code_foreign',
            fields: [`code`]
        }, {
            name: 'variants_unit_id_foreign',
            fields: [`unit_id`]
        },
        {
            name: 'variants_brand_id_foreign',
            fields: [`brand_id`]
        },

        {
            name: 'variants_name_ar_foreign',
            fields: [`name_ar`]
        },
        {
            name: 'variants_name_en_foreign',
            fields: [`name_en`]
        },]
    },

};