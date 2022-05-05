let db = require('../models/index');

class OrderTypesService {
    async getOrderTypes() {
        let typesTable = db.model('order_types');
        const typesList = await typesTable.findAll();
        return JSON.stringify(typesList) ?? [];
    }

    setOrderTypes(typesList) {
        let typesTable = db.model('order_types');
        typesTable.bulkCreate(JSON.parse(typesList), { updateOnDuplicate: Object.keys(typesTable.rawAttributes) });
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