let db = require('../models/index');

class OrderTypesService {
    async getOrderTypes() {
        let typesTable = db.model('order_types');
        const typesList = await typesTable.findAll({ include: { all: true } });
        return JSON.stringify(typesList) ?? [];
    }

    async setOrderTypes(typesList, pricesList) {
        let typesTable = db.model('order_types');
        await typesTable.bulkCreate(JSON.parse(typesList), { updateOnDuplicate: Object.keys(typesTable.rawAttributes) });

        try {
            if (pricesList != [] && pricesList != undefined) {
                let priceTable = db.model("price_list");
                await priceTable.bulkCreate(JSON.parse(pricesList), { updateOnDuplicate: Object.keys(priceTable.rawAttributes) });
            }
        } catch (error) {
            console.log("error bulkCreate priceListTable" + error);
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