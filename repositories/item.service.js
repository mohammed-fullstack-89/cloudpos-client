

let db = require('../models/index');
class ItemService {

    async getQtyByStock(stockId) {
        const priceTable = db.model('price');
        const newQty = await priceTable.findOne({
            where: {
                id: stockId
            }
        });
        return newQty.qty;
    }
    async getItemsByCategory(args) {

        let varianceTable = db.model('variance');
        let items = [];
        let parentId = args[0] == null || args[0] == "" || args[0] == undefined ? null : args[0];
        let limit = args[1];
        let offset = args[2];

        let filter = (parentId != null && parentId != undefined) ?
            {
                id: parentId
            } : null;


        items = await varianceTable.findAll({
            where: {
                show_in_sale_screen: 1
            },
            include: [

                { model: db.model('price'), as: 'get_prices', },
                { model: db.model('segment'), as: 'get_segment' },
                { model: db.model('serial'), as: 'get_serials' },
                { model: db.model('tax'), as: 'get_tax' },
                {
                    model: db.model('category'), as: 'get_item_categories', where: filter
                },
                { model: db.model('supplier'), as: 'get_suppliers' },

            ],

            offset: offset,
            limit: limit
        });
        items = JSON.stringify(items);
        return items;
    }

    async searchItems(args) {
        let type = args[0];
        let value = args[1];

        let items = [];
        if (value == '' || value == null || value == undefined) {
            items = [];
            return items;
        }
        else {

            let varianceTable = db.model('variance');
            let filter = null;
            let serialFilter = null;
            switch (type) {
                case 'name':
                    serialFilter = null;
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
                case 'barcode':
                    serialFilter = null;
                    filter = {
                        [db.Seq().Op.or]: {

                            barcode: { [db.Seq().Op.like]: '%' + value + '%' },

                        }
                    };
                    break;
                case 'serial':
                    filter = null;
                    serialFilter = {
                        serial: {
                            [db.Seq().Op.like]: '%' + value + '%'
                        }
                    }
                    break;
            }



            items = await varianceTable.findAll({
                where: {
                    [db.Seq().Op.and]: filter, show_in_sale_screen: 1
                },
                include: [
                    { model: db.model('price'), as: 'get_prices', },
                    { model: db.model('segment'), as: 'get_segment' },
                    {
                        model: db.model('serial'), as: 'get_serials',
                        where: serialFilter
                    },
                    { model: db.model('tax'), as: 'get_tax' },
                    { model: db.model('category'), as: 'get_item_categories' },
                    { model: db.model('supplier'), as: 'get_suppliers' },

                ],

                // offset: offset,
                // limit: limit
            });


            items = JSON.stringify(items);
            return items;
        }
    }

    async updateStock(args) {

        try {
            let newStockValues = [];
            newStockValues = args;
            let priceTable = db.model('price');
            priceTable.bulkCreate(newStockValues, { updateOnDuplicate: Object.keys(priceTable.rawAttributes) })

        }
        catch (error) {
            console.log("error " + error);
        }
    }

    async getScaleFromBarcode(args) {
        let scaleIdentifier = args[0];
        const scaleTable = await db.model('scale');
        const scale = scaleTable.findOne({
            where: {

                start: { [db.Seq().Op.like]: scaleIdentifier + '%' }
            }

            // include: [
            //     {
            //         model: db.model('scale'), as: 'get_scale_barcode', where: {
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

    async getBarcodeFromScale(args) {
        let scale = args[0];
        let barcode = args[1];
        // const scaleIdentifierCode = String.substr(barcode.length - 1, 6);
        const itemTable = await db.model('variance');
        const items = itemTable.findAll({
            where: {

                barcode: { [db.Seq().Op.like]: barcode + '%' }

            },
            include: [
                {
                    model: db.model('scale'), as: 'get_scale_barcode', where: {
                        id: scale.id
                    }
                }
            ],

        });
        return JSON.stringify(items);
    }
    async setItems(args) {
        try {
            let itemsInfo = args[0];
            let serialsList = args[1];
            let alternatives = args[2];
            let pricesList = args[3];
            let segmantsList = args[4];
            let suppliersList = args[5];
            let taxesList = args[6];
            let taxesItemsRelation = args[7];
            let suppliersItemsRelation = args[8];
            let itemAlternativesRel = args[9];
            let itemCategoriesRel = args[10];
            const varianceTable = db.model('variance');
            const taxTable = db.model("tax");
            const supplierTable = db.model("supplier");
            const segmentTable = db.model("segment");
            const serialTable = db.model("serial");
            const priceTable = db.model("price");
            const itemAlternativeTable = db.model("variance_alternatives");
            const itemCategoriesTable = db.model("variance_categories");
            const itemTaxesTable = db.model("variance_taxes");
            const itemSupplierTable = db.model("variance_suppliers");
            try {
                if (itemsInfo != [] && itemsInfo != undefined) {
                    await varianceTable.destroy({ truncate: true });
                    await varianceTable.bulkCreate(itemsInfo)
                }
            } catch (error) {
                console.log("error " + error);
            }
            try {
                if (taxesList != [] && taxesList != undefined) {
                    await taxTable.destroy({ truncate: true })
                    await taxTable.bulkCreate(taxesList);
                }
            } catch (error) {
                console.log("error " + error);
            }
            try {
                if (suppliersList != [] && suppliersList != undefined) {
                    await supplierTable.destroy({ truncate: true })
                    await supplierTable.bulkCreate(suppliersList);

                }
            } catch (error) {
                console.log("error " + error);
            }
            try {
                if (segmantsList != [] && segmantsList != undefined) {
                    await segmentTable.destroy({ truncate: true })
                    await segmentTable.bulkCreate(segmantsList);
                }
            } catch (error) {
                console.log("error " + error);
            }
            try {
                if (serialsList != [] && serialsList != undefined) {
                    await serialTable.destroy({ truncate: true })
                    await serialTable.bulkCreate(serialsList);
                }
            } catch (error) {
                console.log("error " + error);
            }
            try {
                if (pricesList != [] && pricesList != undefined) {
                    await priceTable.destroy({ truncate: true })
                    await priceTable.bulkCreate(pricesList);
                }
            } catch (error) {
                console.log("error " + error);
            }
            try {
                if (itemAlternativesRel != [] && itemAlternativesRel != undefined) {
                    await itemAlternativeTable.destroy({ truncate: true })
                    await itemAlternativeTable.bulkCreate(itemAlternativesRel);
                }
            } catch (error) {
                console.log("error " + error);
            }
            try {
                if (itemCategoriesRel != [] && itemCategoriesRel != undefined) {
                    await itemCategoriesTable.destroy({ truncate: true })
                    await itemCategoriesTable.bulkCreate(itemCategoriesRel);
                }
            } catch (error) {
                console.log("error " + error);
            }
            try {
                if (suppliersItemsRelation != [] && suppliersItemsRelation != undefined) {
                    await itemSupplierTable.destroy({ truncate: true })
                    await itemSupplierTable.bulkCreate(suppliersItemsRelation);
                }
            } catch (error) {
                console.log("error " + error);
            }
            try {
                if (taxesItemsRelation != [] && taxesItemsRelation != undefined) {
                    await itemTaxesTable.destroy({ truncate: true });
                    await itemTaxesTable.bulkCreate(taxesItemsRelation);
                }
            } catch (error) {
                console.log("error " + error);
            }

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
