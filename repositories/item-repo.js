
let db = require('../models/index');
class ItemService {

    async getQtyByStock(stockId) {
        const priceTable = db.model('stock');
        const newStock = await priceTable.findOne({
            attributes: ['qty'],
            where: {
                id: stockId
            }
        });
        return JSON.stringify(newStock.qty);
    }
    async getItemsByCategory(args) {
        let variantTable = db.model('variant');
        let items = [];
        let parentId = args[0] == null || args[0] == "" || args[0] == undefined ? null : args[0];
        let limit = args[1];
        let offset = args[2];
        let filter = (parentId != null && parentId != undefined) ?
            {
                id: parentId,
            } : null;
        console.log("parentId" + parentId)

        items = await variantTable.findAll({
            where: {
                show_in_sale_screen: 1
            },
            include: [
                {
                    model: db.model('stock'), as: 'stock', include: [

                        { model: db.model('price'), as: 'variant_price', }]

                },

                {
                    model: db.model('segment'), as: 'variant_segment', include: [{
                        model: db.model('stock'), as: 'stock'
                    }
                    ]

                },
                { model: db.model('serial'), as: 'variant_serials' },
                { model: db.model('tax'), as: 'variant_tax' },
                { model: db.model('category'), as: 'variant_item_categories', where: filter, },
                { model: db.model('supplier'), as: 'item_suppliers' },

            ],

            offset: offset,
            limit: limit,

        });

        items = JSON.stringify(items);

        return items;
    }

    async updateSerialQty(args) {
        try {
            const id = args[0];
            const serial_qty = args[0];
            const serialTable = db.model('serial');
            await serialTable.update({ serial_qty }, {
                where: {
                    id
                }
            });
            return true;
        } catch (ex) {
            return false;
        }

    }
    async searchBarcode(args) {
        try {
            console.log("search");
            const code = args[0];

            let item = [];
            if (code == '' || code == null || code == undefined) {
                item = [];
                return item;
            }
            else {

                let variantTable = db.model('variant');

                item = await variantTable.findAll({
                    where: {

                        // show_in_sale_screen: 1
                        [db.Seq().Op.or]: {
                            barcode: code,
                            '$variant_serials.serial$': code
                        }
                    },

                    include: [
                        {
                            model: db.model('stock'), as: 'stock', include: [
                                { model: db.model('price'), as: 'variant_price', }]
                        },

                        {
                            model: db.model('segment'), as: 'variant_segment', include: [{
                                model: db.model('stock'), as: 'stock'
                            }
                            ]

                        },
                        { model: db.model('serial'), as: 'variant_serials' },
                        { model: db.model('tax'), as: 'variant_tax' },
                        {
                            model: db.model('category'), as: 'variant_item_categories'
                        },
                        { model: db.model('supplier'), as: 'item_suppliers' },

                    ],

                });
                item = JSON.stringify(item);
                return item;
            }
        } catch (ex) {
            console.log("ex " + ex);
        }
    }

    async searchItems(args) {
        const type = args[0];
        const value = args[1];
        const offset = args[2];
        const limit = args[3];

        let items = [];
        if (value == '' || value == null || value == undefined) {
            items = [];
            return items;
        }
        else {

            let variantTable = db.model('variant');
            let filter = null;
            switch (type) {
                case 'name':
                    filter = {
                        [db.Seq().Op.or]: {
                            name_ar: { [db.Seq().Op.like]: '%' + value + '%' },
                            name_en: { [db.Seq().Op.like]: '%' + value + '%' },
                            nick_name_ar: { [db.Seq().Op.like]: '%' + value + '%' },
                            nick_name_en: { [db.Seq().Op.like]: '%' + value + '%' },
                            trade_name_ar: { [db.Seq().Op.like]: '%' + value + '%' },
                            trade_name_en: { [db.Seq().Op.like]: '%' + value + '%' },
                            scientific_name_ar: { [db.Seq().Op.like]: '%' + value + '%' },
                            scientific_name_en: { [db.Seq().Op.like]: '%' + value + '%' },
                            brief_name_ar: { [db.Seq().Op.like]: '%' + value + '%' },
                            brief_name_en: { [db.Seq().Op.like]: '%' + value + '%' },
                            description: { [db.Seq().Op.like]: '%' + value + '%' },
                        }
                    };
                    break;
                case 'barcode' || 'serial':
                    filter = {
                        [db.Seq().Op.or]: {
                            barcode: { [db.Seq().Op.like]: '%' + value + '%' },
                            serial: { [db.Seq().Op.like]: '%' + value + '%' }
                        }
                    };
                    break;
            }

            items = await variantTable.findAll({
                where: {
                    [db.Seq().Op.and]: filter,
                    // show_in_sale_screen: 1
                },
                include: [
                    {
                        model: db.model('stock'), as: 'stock', include: [

                            { model: db.model('price'), as: 'variant_price', }]

                    },
                    {
                        model: db.model('segment'), as: 'variant_segment', include: [{
                            model: db.model('stock'), as: 'stock'
                        }
                        ]

                    },
                    { model: db.model('serial'), as: 'variant_serials' },
                    { model: db.model('tax'), as: 'variant_tax' },
                    {
                        model: db.model('category'), as: 'variant_item_categories'
                    },
                    { model: db.model('supplier'), as: 'item_suppliers' },

                ],

                offset: offset,
                limit: limit
            });

            items = JSON.stringify(items);
            return items;
        }
    }

    async updateStock(args) {
        try {
            let newStockValues = [];
            newStockValues = args[0];
            let priceTable = db.model('stock');
            priceTable.bulkCreate(args, { updateOnDuplicate: ['qty'], attributes: ['qty'] })
        }
        catch (error) {
            console.log("error " + error);
        }
    }
    // async getStockData() {

    //     const priceTable = db.model('stock');
    //     const stockData = priceTable.findAll({
    //         attributes: ['id', 'qty']
    //     });
    //     return JSON.stringify(stockData);
    // }

    async getScaleFromBarcode(args) {
        let scaleIdentifier = args[0];
        const scaleTable = db.model('scale');
        const scale = await scaleTable.findOne({
            where: {

                start: { [db.Seq().Op.like]: scaleIdentifier + '%' }
            }

            // include: [
            //     {
            //         model: db.model('scale'), as: 'variant_scale_barcode', where: {
            //             [db.Seq().Op.like]: {
            //                 start: '%' + barcode + '%'
            //             }
            //         }
            //     }
            // ],
            // limit: 1
        });
        return JSON.stringify(scale);
    }

    async getItemFromScale(args) {

        let scale = JSON.parse(args[0]);
        let barcode = args[1];


        const itemTable = db.model('variant');
        const items = await itemTable.findAll({
            where: {

                barcode: { [db.Seq().Op.like]: barcode + '%' },
                scale_id: scale.id
            },
            include: [
                //     all: true
                // }
                { model: db.model('price'), as: 'variant_price', },
                { model: db.model('segment'), as: 'variant_segment' },
                {
                    model: db.model('serial'), as: 'variant_serials',
                    // where: serialFilter
                },
                { model: db.model('tax'), as: 'variant_tax' },
                { model: db.model('category'), as: 'variant_item_categories' },
                { model: db.model('supplier'), as: 'item_suppliers' }]

        });
        return JSON.stringify(items);
    }
    async setItems(args) {
        try {

            const { 0: itemsInfo, 1: serialsList,
                2: pricesList, 3: segmantsList, 4: suppliersList,
                5: taxesList, 6: taxesItemsRelation, 7: suppliersItemsRelation,
                8: itemAlternativesRel, 9: itemCategoriesRel, 10: scaleBarcodeList,
                11: itemStockslist } = args;


            // let itemsInfo = args[0];
            // let serialsList = args[1];
            // let alternatives = args[2];
            // let pricesList = args[3];
            // let segmantsList = args[4];
            // let suppliersList = args[5];
            // let taxesList = args[6];
            // let taxesItemsRelation = args[7];
            // let suppliersItemsRelation = args[8];
            // let itemAlternativesRel = args[9];
            // let itemCategoriesRel = args[10];
            // let scaleBarcodeList = args[11];
            // let itemStockslist = args[12];
            // console.log("taxesItemsRelation : " + JSON.stringify(taxesItemsRelation));

            const variantTable = db.model('variant');
            const taxTable = db.model("tax");
            const supplierTable = db.model("supplier");
            const segmentTable = db.model("segment");
            const serialTable = db.model("serial");
            const priceTable = db.model("price");
            const scaleTable = db.model("scale");
            const stockTable = db.model("stock");
            const itemAlternativeTable = db.model("variant_alternatives");
            const itemCategoriesTable = db.model("variant_categories");
            const itemTaxesTable = db.model("variant_taxes");
            const itemSupplierTable = db.model("variant_suppliers");

            try {
                await scaleTable.destroy({ truncate: false, where: {}, });
                await variantTable.destroy({ truncate: false, where: {}, });
                await taxTable.destroy({ truncate: false, where: {}, });
                await supplierTable.destroy({ truncate: false, where: {}, });
                await segmentTable.destroy({ truncate: false, where: {}, });
                await serialTable.destroy({ truncate: false, where: {}, });
                await priceTable.destroy({ truncate: false, where: {}, });
                await itemAlternativeTable.destroy({ truncate: false, where: {}, });
                await itemCategoriesTable.destroy({ truncate: false, where: {}, });
                await itemSupplierTable.destroy({ truncate: false, where: {}, });
                await itemTaxesTable.destroy({ truncate: false, where: {}, });
                await stockTable.destroy({ truncate: false, where: {}, });

                await itemAlternativeTable.destroy({
                    where: {},
                    truncate: false
                })
                await itemCategoriesTable.destroy({
                    where: {},
                    truncate: false
                })
                await itemSupplierTable.destroy({
                    where: {},
                    truncate: false
                })
                await itemTaxesTable.destroy({
                    where: {},
                    truncate: false
                });
                await stockTable.destroy({
                    where: {},
                    truncate: false
                });
                await scaleTable.destroy({
                    where: {},
                    truncate: false
                })
                await taxTable.destroy({
                    where: {},
                    truncate: false
                });
                await supplierTable.destroy({
                    where: {},
                    truncate: false
                });
                await segmentTable.destroy({
                    where: {},
                    truncate: false
                });
                await serialTable.destroy({
                    where: {},
                    truncate: false
                });
                await priceTable.destroy({
                    where: {},
                    truncate: false
                });
                await variantTable.destroy({
                    where: {},
                    truncate: false
                });


                try {
                    if (scaleBarcodeList != [] && scaleBarcodeList != undefined) {
                        await scaleTable.bulkCreate(scaleBarcodeList);
                    }
                } catch (error) {
                    console.log("scaleBarcodeList error : " + error);
                }
                try {
                    if (itemsInfo != [] && itemsInfo != undefined) {

                        await variantTable.bulkCreate(itemsInfo);
                        //     , {

                        //     include: [
                        //         { model: db.model('price'), as: 'variant_price', },
                        //         { model: db.model('segment'), as: 'variant_segment' },
                        //         {
                        //             model: db.model('serial'), as: 'variant_serials',

                        //         },
                        //         { model: db.model('tax'), as: 'variant_tax' },
                        //         { model: db.model('category'), as: 'variant_item_categories' },
                        //         { model: db.model('supplier'), as: 'item_suppliers' },
                        //         { model: scaleTable, as: 'variant_scale_barcode', ignoreDuplicates: true },

                        //     ]
                        // }

                        // )
                    }
                } catch (error) {
                    console.log("itemsInfo error :" + error);
                }

                try {
                    if (taxesList != [] && taxesList != undefined) {
                        await taxTable.bulkCreate(taxesList);
                    }
                } catch (error) {
                    console.log("taxesList error : " + error);
                }
                try {
                    if (suppliersList != [] && suppliersList != undefined) {
                        await supplierTable.bulkCreate(suppliersList);

                    }
                } catch (error) {
                    console.log("suppliersList error : " + error);
                }
                try {
                    if (segmantsList != [] && segmantsList != undefined) {
                        await segmentTable.bulkCreate(segmantsList);
                    }
                } catch (error) {
                    console.log("segmantsList error :" + error);
                }
                try {
                    console.log("serialsList " + JSON.stringify(serialsList));
                    if (serialsList != [] && serialsList != undefined) {
                        await serialTable.bulkCreate(serialsList);
                    }
                } catch (error) {
                    console.log("serialsList error: " + error);
                }
                try {
                    if (pricesList != [] && pricesList != undefined) {
                        await priceTable.bulkCreate(pricesList);
                    }
                } catch (error) {
                    console.log("pricesList error: " + error);
                }
                try {
                    if (itemAlternativesRel != [] && itemAlternativesRel != undefined) {
                        await itemAlternativeTable.bulkCreate(itemAlternativesRel);
                    }
                } catch (error) {
                    console.log("itemAlternativesRel error : " + error);
                }
                try {
                    if (itemCategoriesRel != [] && itemCategoriesRel != undefined) {
                        await itemCategoriesTable.bulkCreate(itemCategoriesRel);
                    }
                } catch (error) {
                    console.log("itemCategoriesRel error : " + error);
                }
                try {
                    if (suppliersItemsRelation != [] && suppliersItemsRelation != undefined) {

                        await itemSupplierTable.bulkCreate(suppliersItemsRelation);
                    }
                } catch (error) {
                    console.log("suppliersItemsRelation error :" + error);
                }
                try {
                    if (taxesItemsRelation != [] && taxesItemsRelation != undefined) {

                        await itemTaxesTable.bulkCreate(taxesItemsRelation);
                    }
                } catch (error) {
                    console.log("taxesItemsRelation error :" + error);
                }
                try {
                    if (itemStockslist != [] && itemStockslist != undefined) {
                        await stockTable.bulkCreate(itemStockslist);
                    }
                } catch (error) {
                    console.log("stockTable error :" + error);
                }

            } catch (error) {
                console.log("error " + error);
            } finally { }


        } catch (error) {
            console.log("error " + error);
        }
    }
}




ItemService.instance = null;
ItemService.getInstance = function () {
    if (ItemService.instance === null) {
        ItemService.instance = new ItemService();
    }
    return ItemService.instance;
}

module.exports = ItemService.getInstance();
