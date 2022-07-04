let db = require('../models/index');

class OrderTypesService {
    async getOrderTypes() {
        let typesTable = db.model('order_types');
        const typesList = await typesTable.findAll({ include: { all: true, nested: true } });
        return JSON.stringify(typesList) ?? [];
    }

    async setOrderTypes(typesList, pricesList, variantPriceList) {
        try {

            let typesTable = db.model('order_types');
            let priceTable = db.model('price_list');
            let variantPriceListTable = db.model('variant_price_list');

            await priceTable.destroy({ truncate: true });
            await typesTable.destroy({ truncate: true });
            await variantPriceListTable.destroy({ truncate: true });

            await typesTable.bulkCreate(JSON.parse(typesList));

            if (pricesList != [] && pricesList != undefined && variantPriceList != [] && variantPriceList != undefined) {
                await priceTable.bulkCreate(JSON.parse(pricesList), { updateOnDuplicate: Object.keys(priceTable.rawAttributes) });
                await variantPriceListTable.bulkCreate(JSON.parse(variantPriceList), { updateOnDuplicate: Object.keys(variantPriceListTable.rawAttributes) });
            }
        } catch (error) {
            console.log("error bulkCreate setOrdertypes " + error);
        }
    }
}

OrderTypesService.instance = null;
OrderTypesService.getInstance = function () {
    if (OrderTypesService.instance === null) {
        OrderTypesService.instance = new OrderTypesService();
    }
    return OrderTypesService.instance;
};

module.exports = OrderTypesService.getInstance();