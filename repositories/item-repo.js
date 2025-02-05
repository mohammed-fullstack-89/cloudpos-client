let db = require('../models/index');
class ItemService {

    async getQtyByStock(stockId) {
        const newStock = await db.model('stock').findByPk(stockId);
        return JSON.stringify(newStock.qty);
    }

    async getItemsByCategory(args) {
        let variantTable = db.model('variant');
        let items = [];
        let parentId = args[0] == null || args[0] == "" || args[0] == undefined ? null : args[0];
        let limit = args[1];
        let offset = args[2];
        let filter = (parentId != null && parentId != undefined) ? { id: parentId } : null;

        items = await variantTable.findAll({
            where: {
                show_in_sale_screen: 1
            },
            include: [
                { model: db.model('stock'), as: 'stock', where: { status: 1 }, include: [{ model: db.model('price'), as: 'variant_price' }] },
                { model: db.model('scale'), as: 'variant_scale_barcode' },
                { model: db.model('color'), as: 'variant_color' },
                { model: db.model('unit'), as: 'variant_unit' },
                { model: db.model('size'), as: 'variant_size' },
                { model: db.model('brand'), as: 'variant_brand' },
                {
                    model: db.model('variant'), as: 'variant_segment', include: [{
                        model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                        include: [{ model: db.model('price'), as: 'variant_price' }]
                    }]
                },
                { model: db.model('serial'), as: 'variant_serial' },
                { model: db.model('tax'), as: 'variant_tax' },
                { model: db.model('category'), as: 'variant_category', where: filter },
                { model: db.model('category'), as: 'main_category', where: filter, required: false },
                { model: db.model('supplier'), as: 'item_suppliers' },
                {
                    model: db.model('itemManufacturing'), as: 'manufacturing_item',
                    include: [{
                        model: db.model('variant'), as: 'variant',
                        include: [{
                            model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                            include: [{ model: db.model('price'), as: 'variant_price' }]
                        }]
                    }]
                },
                {
                    model: db.model('variant_modifier'), as: 'variant_modifiers', include: [{
                        model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                        include: [{ model: db.model('price'), as: 'variant_price' }]
                    }]
                },
                { model: db.model('stock'), as: 'parent_stock', where: { status: 1 }, include: [{ model: db.model('price'), as: 'variant_price' }], required: false },
                { model: db.model('barcodes'), as: 'barcodes' }
            ],
            order: [
                ['sequence', 'ASC']
            ],
            offset: offset,
            limit: limit
        });

        items = JSON.stringify(items);
        return items;
    }

    async updateSerialQty(args) {
        try {
            const id = args[0];
            const serial_qty = args[1];
            const serialTable = db.model('serial');
            await serialTable.update({ serial_qty }, {
                where: { id: id }
            });
            return true;
        } catch (ex) {
            return false;
        }
    }

    async searchBarcode(args) {
        try {
            const code = args[0];
            let item = [];
            if (code == '' || code == null || code == undefined) {
                item = [];
                return item;
            } else {
                let variantTable = db.model('variant');
                item = await variantTable.findAll({
                    where: {
                        [db.Seq().Op.or]: {
                            barcode: code,
                            '$barcodes.barcode$': code,
                            '$variant_segment.barcode$': code,
                            '$variant_serial.serial$': code
                        }
                    },
                    include: [
                        {
                            model: db.model('stock'), as: 'stock', where: { status: 1 }, include: [
                                { model: db.model('price'), as: 'variant_price' }]
                        },
                        { model: db.model('scale'), as: 'variant_scale_barcode' },
                        { model: db.model('color'), as: 'variant_color' },
                        { model: db.model('unit'), as: 'variant_unit' },
                        { model: db.model('size'), as: 'variant_size' },
                        { model: db.model('brand'), as: 'variant_brand' },
                        {
                            model: db.model('variant'), as: 'variant_segment', include: [{
                                model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                                include: [{ model: db.model('price'), as: 'variant_price' }]
                            }]
                        },
                        { model: db.model('serial'), as: 'variant_serial' },
                        { model: db.model('tax'), as: 'variant_tax' },
                        { model: db.model('category'), as: 'variant_category' },
                        { model: db.model('supplier'), as: 'item_suppliers' },
                        {
                            model: db.model('itemManufacturing'), as: 'manufacturing_item',
                            include: [{
                                model: db.model('variant'), as: 'variant',
                                include: [{
                                    model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                                    include: [{ model: db.model('price'), as: 'variant_price' }]
                                }]
                            }]
                        },
                        {
                            model: db.model('variant_modifier'), as: 'variant_modifiers', include: [{
                                model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                                include: [{ model: db.model('price'), as: 'variant_price' }]
                            }]
                        },
                        {
                            model: db.model('barcodes'), as: 'barcodes'
                        }
                    ],
                });
                item = JSON.stringify(item);
                return item;
            }
        } catch (ex) {
            console.log("error:  " + ex);
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
        } else {
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
                            description_ar: { [db.Seq().Op.like]: '%' + value + '%' },
                            description_en: { [db.Seq().Op.like]: '%' + value + '%' }
                        }
                    };
                    break;
                case 'barcode+serial':
                    filter = {
                        [db.Seq().Op.or]: {
                            barcode: { [db.Seq().Op.like]: '%' + value + '%' },
                            '$barcodes.barcode$': { [db.Seq().Op.like]: '%' + value + '%' },
                            '$variant_serial.serial$': value,
                            '$variant_segment.barcode$': value
                        }
                    };
                    break;
            }
            items = await variantTable.findAll({
                include: [
                    {
                        model: db.model('stock'), as: 'stock', where: { status: 1 }, include: [
                            { model: db.model('price'), as: 'variant_price' }]
                    },
                    { model: db.model('scale'), as: 'variant_scale_barcode' },
                    { model: db.model('color'), as: 'variant_color' },
                    { model: db.model('unit'), as: 'variant_unit' },
                    { model: db.model('size'), as: 'variant_size' },
                    { model: db.model('brand'), as: 'variant_brand' },
                    {
                        model: db.model('variant'), as: 'variant_segment', include: [{
                            model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                            include: [{ model: db.model('price'), as: 'variant_price' }]
                        }]
                    },
                    { model: db.model('serial'), as: 'variant_serial' },
                    { model: db.model('tax'), as: 'variant_tax' },
                    { model: db.model('category'), as: 'variant_category' },
                    { model: db.model('supplier'), as: 'item_suppliers' },
                    {
                        model: db.model('itemManufacturing'), as: 'manufacturing_item',
                        include: [{
                            model: db.model('variant'), as: 'variant',
                            include: [{
                                model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                                include: [{ model: db.model('price'), as: 'variant_price' }]
                            }]
                        }]
                    },
                    {
                        model: db.model('variant_modifier'), as: 'variant_modifiers', include: [{
                            model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                            include: [{ model: db.model('price'), as: 'variant_price' }]
                        }]
                    },
                    {
                        model: db.model('barcodes'), as: 'barcodes'
                    }
                ],
                where: filter,
                subQuery: false, //top level where with limit bug in sequelize (solution)
                order: [
                    ['name_ar', 'DESC'],
                    ['name_en', 'DESC'],
                    ['nick_name_ar', 'DESC'],
                    ['nick_name_en', 'DESC'],
                    ['trade_name_ar', 'DESC'],
                    ['trade_name_en', 'DESC'],
                    ['scientific_name_ar', 'DESC'],
                    ['scientific_name_en', 'DESC'],
                    ['brief_name_ar', 'DESC'],
                    ['brief_name_en', 'DESC']
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
            const stockTable = db.model('stock');
            args.forEach(element => {
                stockTable.decrement('qty', { by: element.qty, where: { id: element.stock_id } });
            });
        } catch (error) {
            console.error("error " + error);
        }
    }

    async getScaleFromBarcode(args) {
        let scaleIdentifier = args;
        const scaleTable = db.model('scale');
        var scale = await scaleTable.findOne({
            where: { start: scaleIdentifier },
            limit: 1
        });
        return JSON.stringify(scale);
    }

    async getItemFromScale(args) {

        let scale = JSON.parse(args[0]);
        let barcode = args[1];

        const itemTable = db.model('variant');
        const items = await itemTable.findAll({
            where: {
                barcode: barcode,
                '$barcodes.barcode$': barcode,
                scale_barcode_id: scale.id
            },
            include: [
                {
                    model: db.model('stock'), as: 'stock', where: { status: 1 }, include: [
                        { model: db.model('price'), as: 'variant_price' }]
                },
                { model: db.model('scale'), as: 'variant_scale_barcode' },
                { model: db.model('color'), as: 'variant_color' },
                { model: db.model('unit'), as: 'variant_unit' },
                { model: db.model('size'), as: 'variant_size' },
                { model: db.model('brand'), as: 'variant_brand' },
                {
                    model: db.model('variant'), as: 'variant_segment', include: [{
                        model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                        include: [{ model: db.model('price'), as: 'variant_price' }]
                    }]
                },
                { model: db.model('serial'), as: 'variant_serial' },
                { model: db.model('tax'), as: 'variant_tax' },
                { model: db.model('category'), as: 'variant_category' },
                { model: db.model('supplier'), as: 'item_suppliers' },
                {
                    model: db.model('itemManufacturing'), as: 'manufacturing_item',
                    include: [{
                        model: db.model('variant'), as: 'variant',
                        include: [{
                            model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                            include: [{ model: db.model('price'), as: 'variant_price' }]
                        }]
                    }]
                },
                {
                    model: db.model('variant_modifier'), as: 'variant_modifiers', include: [{
                        model: db.model('stock'), as: 'stock', where: { status: 1 }, required: false,
                        include: [{ model: db.model('price'), as: 'variant_price' }]
                    }]
                },
                {
                    model: db.model('barcodes'), as: 'barcodes'
                }
            ],
            limit: 1
        });
        return JSON.stringify(items);
    }

    async setItems(args) {
        try {
            const { 0: itemsInfo, 1: serialsList,
                2: pricesList, 3: segmantsList, 4: suppliersList,
                5: taxesList, 6: taxesItemsRelation, 7: suppliersItemsRelation,
                8: itemAlternativesRel, 9: itemCategoriesRel, 10: scaleBarcodeList,
                11: itemStockslist, 12: itemManufacturingList, 13: itemsUnitsList, 14: itemsSizesList,
                15: itemsColorsList, 16: itemsBrandsList, 17: itemModifiersList, 18: barcodesList, 19: force } = args;
            const variantTable = db.model('variant');
            const taxTable = db.model("tax");
            const supplierTable = db.model("supplier");
            const serialTable = db.model("serial");
            const priceTable = db.model("price");
            const scaleTable = db.model("scale");
            const stockTable = db.model("stock");
            const itemAlternativeTable = db.model("variant_alternatives");
            const itemCategoriesTable = db.model("variant_categories");
            const itemTaxesTable = db.model("variant_taxes");
            const itemSupplierTable = db.model("variant_suppliers");
            const itemManufacturingTable = db.model("itemManufacturing");
            const colorTable = db.model("color");
            const unitTable = db.model("unit");
            const sizeTable = db.model("size");
            const brandTable = db.model("brand");
            const itemModifiersTable = db.model('variant_modifier');
            const barcodesTable = db.model('barcodes');


            try {
                if (force) {
                    await scaleTable.destroy({ truncate: true });
                    await variantTable.destroy({ truncate: true });
                    await taxTable.destroy({ truncate: true });
                    await supplierTable.destroy({ truncate: true });
                    await serialTable.destroy({ truncate: true });
                    await priceTable.destroy({ truncate: true });
                    await itemAlternativeTable.destroy({ truncate: true, });
                    await itemCategoriesTable.destroy({ truncate: true });
                    await itemSupplierTable.destroy({ truncate: true });
                    await itemTaxesTable.destroy({ truncate: true });
                    await stockTable.destroy({ truncate: true });
                    await itemManufacturingTable.destroy({ truncate: true });
                    await unitTable.destroy({ truncate: true });
                    await sizeTable.destroy({ truncate: true });
                    await brandTable.destroy({ truncate: true });
                    await colorTable.destroy({ truncate: true });
                    await itemModifiersTable.destroy({ truncate: true });
                    await barcodesTable.destroy({ truncate: true });
                }

                try {
                    for (let i = itemsInfo.length - 1; i >= 0; i--) {
                        await variantTable.destroy({ where: { id: itemsInfo[i].id }, force: true });
                    }
                } catch (error) {
                    console.log("destroying variant table and its relations  for item history error : " + error);
                }

                try {
                    if (scaleBarcodeList != [] && scaleBarcodeList != undefined) {
                        await scaleTable.bulkCreate(scaleBarcodeList, { updateOnDuplicate: [...Object.keys(scaleTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("scaleBarcodeList error : " + error);
                }

                try {
                    if (itemsUnitsList != [] && itemsUnitsList != undefined) {
                        await unitTable.bulkCreate(itemsUnitsList, { updateOnDuplicate: [...Object.keys(unitTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("itemsUnitsList error : " + error);
                }

                try {
                    if (itemsSizesList != [] && itemsSizesList != undefined) {
                        await sizeTable.bulkCreate(itemsSizesList, { updateOnDuplicate: [...Object.keys(sizeTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("itemsSizesList error : " + error);
                }

                try {
                    if (itemsColorsList != [] && itemsColorsList != undefined) {
                        await colorTable.bulkCreate(itemsColorsList, { updateOnDuplicate: [...Object.keys(colorTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("itemsColorsList error : " + error);
                }

                try {
                    if (itemsBrandsList != [] && itemsBrandsList != undefined) {
                        await brandTable.bulkCreate(itemsBrandsList, { updateOnDuplicate: [...Object.keys(brandTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("itemsBrandsList error : " + error);
                }

                try {
                    if (itemsInfo != [] && itemsInfo != undefined) {
                        await variantTable.bulkCreate(itemsInfo, { updateOnDuplicate: [...Object.keys(variantTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("itemsInfo error :" + error);
                }

                try {
                    if (taxesList != [] && taxesList != undefined) {
                        await taxTable.bulkCreate(taxesList, { updateOnDuplicate: [...Object.keys(taxTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("taxesList error : " + error);
                }

                try {
                    if (suppliersList != [] && suppliersList != undefined) {
                        await supplierTable.bulkCreate(suppliersList, { updateOnDuplicate: [...Object.keys(supplierTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("suppliersList error : " + error);
                }

                try {
                    if (serialsList != [] && serialsList != undefined) {
                        await serialTable.bulkCreate(serialsList, { updateOnDuplicate: [...Object.keys(serialTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("serialsList error: " + error);
                }

                try {
                    if (pricesList != [] && pricesList != undefined) {
                        await priceTable.bulkCreate(pricesList, { updateOnDuplicate: [...Object.keys(priceTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("pricesList error: " + error);
                }

                try {
                    if (itemAlternativesRel != [] && itemAlternativesRel != undefined) {
                        await itemAlternativeTable.bulkCreate(itemAlternativesRel, { updateOnDuplicate: [...Object.keys(itemAlternativeTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("itemAlternativesRel error : " + error);
                }

                try {
                    if (itemCategoriesRel != [] && itemCategoriesRel != undefined) {
                        await itemCategoriesTable.bulkCreate(itemCategoriesRel, { updateOnDuplicate: [...Object.keys(itemCategoriesTable.rawAttributes)], validate: true });
                    }
                } catch (error) {
                    console.log("itemCategoriesRel error : " + error);
                }

                try {
                    if (suppliersItemsRelation != [] && suppliersItemsRelation != undefined) {
                        await itemSupplierTable.bulkCreate(suppliersItemsRelation, { updateOnDuplicate: [...Object.keys(itemSupplierTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("suppliersItemsRelation error :" + error);
                }

                try {
                    if (taxesItemsRelation != [] && taxesItemsRelation != undefined) {
                        await itemTaxesTable.bulkCreate(taxesItemsRelation, { updateOnDuplicate: [...Object.keys(itemTaxesTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("taxesItemsRelation error :" + error);
                }

                try {
                    if (itemStockslist != [] && itemStockslist != undefined) {
                        await stockTable.bulkCreate(itemStockslist, { updateOnDuplicate: [...Object.keys(stockTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log(error);
                }

                try {
                    if (itemManufacturingList != [] && itemManufacturingList != undefined) {
                        await itemManufacturingTable.bulkCreate(itemManufacturingList, { updateOnDuplicate: [...Object.keys(itemManufacturingTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("itemManufacturingList error : " + error);
                }

                try {
                    if (itemModifiersList != [] && itemModifiersList != undefined) {
                        await itemModifiersTable.bulkCreate(itemModifiersList, { updateOnDuplicate: [...Object.keys(itemModifiersTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("itemModifiersList error : " + error);
                }

                try {
                    if (barcodesList != [] && barcodesList != undefined) {
                        await barcodesTable.bulkCreate(barcodesList, { updateOnDuplicate: [...Object.keys(barcodesTable.rawAttributes)] });
                    }
                } catch (error) {
                    console.log("barcodesList error : " + error);
                }

            } catch (error) {
                console.log("error " + error);
            }
        } catch (error) {
            console.log("error" + error);
        }
    }
}

ItemService.instance = null;
ItemService.getInstance = function () {
    if (ItemService.instance === null) {
        ItemService.instance = new ItemService();
    }
    return ItemService.instance;
};
module.exports = ItemService.getInstance();
