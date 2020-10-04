

let db = require('../../../models/index');
let itemService = function itemService() {


    this.getItems = async function () {
        let itemTable = db.model('item');
        let items = [];
        items = await itemTable.findAll({ include: { all: true, nested: true } });
        return items;
    }

    this.getItemsByCategory = async function (args) {
        // console.log("asdas2 " + args);
        // parentId = args[0];
        // limit = args[1];
        // offset = args[2];
        let itemCategoriesTable = db.model('item_categories');
        let itemTable = db.model('item');


        console.log("dwwwwwwwwww " + args);
        let items = [];
        let parentId = args[0] == null || args[0] == "" || args[0] == undefined ? args[0] : null;
        let limit = args[1];
        let offset = args[2];
        items = await itemTable.findAll({

            where: {
                main_category_id: parentId,
                categoryId: parentId
            },
            // include: { all: true },
            include: [
                { model: db.model('price'), as: 'get_prices', },
                { model: db.model('segment'), as: 'get_segment' },
                { model: db.model('serial'), as: 'get_serials' },
                { model: db.model('tax'), as: 'get_tax' },
                // { model: db.model('item_categories'), as: 'get_item_categories', nested: true },
                { model: db.model('supplier'), as: 'get_suppliers' },

            ],

            offset: offset,
            limit: limit
        });
        items = JSON.stringify(items);
        console.log("items items items " + items);
        return items;
    }
    this.searchItems = async function (args) {
        let type = args[0];
        let value = args[1];
        let itemTable = db.model('item');
        let items = [];
        items =

            // await itemTable.findAll({
            //     // where: {
            //     //     [db.Seq().Op.or]: {
            //     //         name: { [db.Seq().Op.like]: '%' + value + '%' },
            //     //         barcode: { [db.Seq().Op.like]: '%' + value + '%' },
            //     //     }
            //     // },
            //     include: [
            //         { model: db.model('price'), as: 'get_prices', },
            //         { model: db.model('segment'), as: 'get_segment' },
            //         {
            //             model: db.model('serial'), as: 'get_serials',
            //             //  where: {
            //             //     [db.Seq().Op.or]: { serial: { [db.Seq().Op.like]: '%' + value + '%' } }
            //             // }
            //         },
            //         { model: db.model('tax'), as: 'get_tax' },
            //         // { model: db.model('item_categories'), as: 'get_item_categories', nested: true },
            //         { model: db.model('supplier'), as: 'get_suppliers' },

            //     ],
            // });

            await itemTable.findAll({

                // where: {
                //     main_category_id: parentId,
                //     categoryId: parentId
                // },
                // include: { all: true },

                where: {
                    [db.Seq().Op.or]: {
                        name_ar: { [db.Seq().Op.like]: '%' + value + '%' },
                        nick_name_en: { [db.Seq().Op.like]: '%' + value + '%' },
                        nick_name_ar: { [db.Seq().Op.like]: '%' + value + '%' },
                        barcode: { [db.Seq().Op.like]: '%' + value + '%' },

                    }
                },
                include: [
                    { model: db.model('price'), as: 'get_prices', },
                    { model: db.model('segment'), as: 'get_segment' },
                    {
                        model: db.model('serial'), as: 'get_serials',
                        where: {
                            // [db.Seq().Op.or]: {
                            serial: { [db.Seq().Op.like]: '%' + value + '%' }
                            // }
                        }
                    },
                    { model: db.model('tax'), as: 'get_tax' },
                    // { model: db.model('item_categories'), as: 'get_item_categories', nested: true },
                    { model: db.model('supplier'), as: 'get_suppliers' },

                ],

                // offset: offset,
                // limit: limit
            });
        items = JSON.stringify(items);
        console.log("items : " + items);
        return items;
    }

    this.setItems = async function (args) {
        try {

            itemsInfo = args[0];
            serialsList = args[1];
            alternatives = args[2];
            pricesList = args[3];
            segmantsList = args[4];
            suppliersList = args[5];
            taxesList = args[6];
            taxesItemsRelation = args[7];
            suppliersItemsRelation = args[8];
            itemAlternativesRel = args[9];
            itemCategoriesRel = args[10];

            let itemTable = db.model("item");
            let taxTable = db.model("tax");
            let supplierTable = db.model("supplier");
            let segmentTable = db.model("segment");
            let serialTable = db.model("serial");
            let priceTable = db.model("price");
            let itemAlternativeTable = db.model("item_alternatives");
            let itemCategoriesTable = db.model("item_categories");
            let itemSupplierTable = db.model("item_suppliers");

            // await itemTable.destroy({ truncate: true, include: { all: true, nested: true } });
            // await itemTable.bulkCreate(data, { updateOnDuplicate: Object.keys(itemTable.rawAttributes) })


            if (itemsInfo != [] && itemsInfo != undefined) {
                await itemTable.destroy({ truncate: true });
                await itemTable.bulkCreate(itemsInfo)


            }

            if (taxesList != [] && taxesList != undefined) {
                await taxTable.destroy({ truncate: true })
                await taxTable.bulkCreate(taxesList);

            }

            if (suppliersList != [] && suppliersList != undefined) {
                await supplierTable.destroy({ truncate: true })
                await supplierTable.bulkCreate(suppliersList);

            }

            if (segmantsList != [] && segmantsList != undefined) {
                await segmentTable.destroy({ truncate: true })
                await segmentTable.bulkCreate(segmantsList);

            }
            console.log('asdsa ' + serialsList);
            if (serialsList != [] && serialsList != undefined) {
                await serialTable.destroy({ truncate: true })
                await serialTable.bulkCreate(serialsList);

            }

            if (pricesList != [] && pricesList != undefined) {
                await priceTable.destroy({ truncate: true })
                await priceTable.bulkCreate(pricesList);

            }


            if (itemAlternativesRel != [] && itemAlternativesRel != undefined) {
                itemAlternativeTable.destroy({ truncate: true }).then(() => {
                    itemAlternativeTable.bulkCreate(itemAlternativesRel);
                })
            }

            if (itemCategoriesRel != [] && itemCategoriesRel != undefined) {
                itemCategoriesTable.destroy({ truncate: true }).then(() => {
                    itemCategoriesTable.bulkCreate(itemCategoriesRel);
                })
            }

            if (suppliersItemsRelation != [] && suppliersItemsRelation != undefined) {
                itemSupplierTable.destroy({ truncate: true }).then(() => {
                    itemSupplierTable.bulkCreate(suppliersItemsRelation);
                })
            }

        } catch (error) {
            console.log("error " + error);
        }

    }

    if (itemService.caller != itemService.getInstance) {
        throw new Error("This object cannot be instanciated");
    }

}

itemService.instance = null;
itemService.getInstance = function () {
    if (this.instance === null) {
        this.instance = new itemService();
    }
    return this.instance;
}

module.exports = itemService.getInstance();
