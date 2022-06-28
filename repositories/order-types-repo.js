let db = require('../models/index');

class OrderTypesService {
    async getOrderTypes() {
        let typesTable = db.model('order_types');
        const typesList = await typesTable.findAll({ include: { all: true, nested: true } });
        return JSON.stringify(typesList) ?? [];
    }

    async setOrderTypes(typesList, pricesList) {
        try {

            let typesTable = db.model('order_types');
            let priceTable = db.model('price_list');
            let variantPriceListTable = db.model('variant_price_list');

            await priceTable.destroy({ truncate: true });
            await typesTable.destroy({ truncate: true });
            await variantPriceListTable.destroy({ truncate: true });


            await typesTable.bulkCreate(JSON.parse(typesList));
            if (pricesList != [] && pricesList != undefined) {
                await priceTable.bulkCreate(JSON.parse(pricesList), { include: 'variant_price_lists', updateOnDuplicate: Object.keys(priceTable.rawAttributes) });
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