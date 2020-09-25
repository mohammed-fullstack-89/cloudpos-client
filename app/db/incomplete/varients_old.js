// var orm = require('../db.manager')
//     , Seq = orm.Seq();


// module.exports = {
//     model: {
//         id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
//         nick_name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         nick_name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         barcode: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         code: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         unit_id: { type: Seq.BIGINT, defaultValue: null },
//         brand_id: { type: Seq.BIGINT, defaultValue: null },
//         color_id: { type: Seq.BIGINT, defaultValue: null },
//         size_id: { type: Seq.BIGINT, defaultValue: null },
//         column: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         row: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         shelf: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         max_order: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         min_order: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         discount_type: { type: Seq.ENUM('percentage', 'value', 'undefined'), allowNull: false },
//         discount_value: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         max_discoun: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         commission_type: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         commission_value: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         commission_base_on: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         image: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         barcode_start: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         barcode_end: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         monitoring: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
//         show_in_sale_screen: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
//         stop_sale: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
//         edit_price: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
//         item_segmented: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
//         allow_discount: { type: Seq.TINYINT, allowNull: false, defaultValue: 0 },
//         item_id: { type: Seq.BIGINT, defaultValue: null, allowNull: true },
//         is_main_item: { type: Seq.INTEGER, allowNull: true, defaultValue: 0 },
//         has_expire_date: { type: Seq.INTEGER, allowNull: true, defaultValue: 0 },
//         get_item?: MainItem;
//         get_prices?: Price[];
//         get_tax?: Tax[];
//         get_categories?: Category[];
//         get_serials?: Serial[];
//         get_segment?: Segment[];


//     },
//     relations: [{

//         type: 'belongsToMany',
//         related_to: 'suppliers',
//         relationOptions: {
//             as: 'get_suppliers',
//             through: 'items_suppliers',
//             foreignKey: 'item_id',
//             otherKey: 'supplier_id',
//         },
//     },
//     {
//         type: 'belongsToMany',
//         related_to: 'prices',
//         relationOptions: {
//             as: 'get_prices',
//             through: 'items_prices',
//             foreignKey: 'variant_id',
//             otherKey: 'prices_id',
//         },

//     },
//     {
//         type: 'belongsToMany',
//         related_to: 'side_effects',
//         relationOptions: {
//             as: 'get_side_effects',
//             through: 'items_side_effects',
//             foreignKey: 'item_id',
//             otherKey: 'side_effects_id',
//         },
//     },
//     {
//         type: 'belongsToMany',
//         related_to: 'items',
//         relationOptions: {
//             as: 'get_item_alternatives',
//             through: 'item_alternatives',
//             foreignKey: 'item_id',
//             otherKey: 'alternative_id',
//         }
//     },
//     {
//         type: 'belongsToMany',
//         related_to: 'categories',
//         relationOptions: {
//             as: 'get_item_categories',
//             through: 'categories_items',
//             foreignKey: 'item_id',
//             otherKey: 'category_id',
//         },
//     }],


//     columnsIndex: {
//         indexes: [{
//             name: 'items_nick_name_ar_foreign',
//             fields: [`nick_name_ar`]
//         },
//         {
//             name: 'items_nick_name_en_foreign',
//             fields: [`nick_name_en`]
//         },
//         {
//             name: 'items_barcode_foreign',
//             fields: [`barcode`]
//         },
//         {
//             name: 'items_code_foreign',
//             fields: [`code`]
//         }, {
//             name: 'items_unit_id_foreign',
//             fields: [`unit_id`]
//         },
//         {
//             name: 'items_brand_id_foreign',
//             fields: [`brand_id`]
//         },
//         {
//             name: 'items_item_id_foreign',
//             fields: [`item_id`]
//         }]
//     },

// }