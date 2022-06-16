let db = require('../models/index');

class OrderTypesService {
    async getOrderTypes() {
        let typesTable = db.model('order_types');
        const typesList = await typesTable.findAll();
        return JSON.stringify(typesList) ?? [];
    }

    setOrderTypes(typesList, pricesList) {
        let typesTable = db.model('order_types');
        typesTable.bulkCreate(JSON.parse(typesList), { updateOnDuplicate: Object.keys(typesTable.rawAttributes) });


        try {
            if (pricesList != [] && pricesList != undefined) {
                let priceList = db.model("price_list");
                priceList.bulkCreate(JSON.parse(pricesList), { updateOnDuplicate: Object.keys(typesTable.rawAttributes) });
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