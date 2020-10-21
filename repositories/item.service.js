

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
        // console.log("asdas2 " + args);
        // parentId = args[0];
        // limit = args[1];
        // offset = args[2];
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

            console.log(" newStockValues " + JSON.stringify(newStockValues));
            console.log(" newStockValues " + JSON.stringify(Object.keys(priceTable.rawAttributes)));

            priceTable.bulkCreate(newStockValues, { updateOnDuplicate: Object.keys(priceTable.rawAttributes) })

        }
        catch (error) {
            console.log("error " + error);
        }
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

            if (itemsInfo != [] && itemsInfo != undefined) {
                await varianceTable.destroy({ truncate: true });
                await varianceTable.bulkCreate(itemsInfo)
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

            if (serialsList != [] && serialsList != undefined) {
                await serialTable.destroy({ truncate: true })
                await serialTable.bulkCreate(serialsList);
            }

            if (pricesList != [] && pricesList != undefined) {
                await priceTable.destroy({ truncate: true })
                await priceTable.bulkCreate(pricesList);
            }

            if (itemAlternativesRel != [] && itemAlternativesRel != undefined) {
                await itemAlternativeTable.destroy({ truncate: true })
                await itemAlternativeTable.bulkCreate(itemAlternativesRel);
            }

            console.log("itemCategoriesRel " + JSON.stringify(itemCategoriesRel));
            if (itemCategoriesRel != [] && itemCategoriesRel != undefined) {
                await itemCategoriesTable.destroy({ truncate: true })
                await itemCategoriesTable.bulkCreate(itemCategoriesRel);
            }

            if (suppliersItemsRelation != [] && suppliersItemsRelation != undefined) {
                await itemSupplierTable.destroy({ truncate: true })
                await itemSupplierTable.bulkCreate(suppliersItemsRelation);
            }

            if (taxesItemsRelation != [] && taxesItemsRelation != undefined) {
                await itemTaxesTable.destroy({ truncate: true });
                console.log("taxesItemsRelation " + JSON.stringify(taxesItemsRelation));
                await itemTaxesTable.bulkCreate(taxesItemsRelation);
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
