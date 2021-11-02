const db = require('../models/index');
class StockService {

    async getStocksByVariantId(variantId) {
        try {
            const stocks = await db.model('stock').findAll({
                where: {
                    variant_id: variantId
                }
            });
            return JSON.stringify(stocks);
        } catch (error) {
            console.log("error : " + error);
        }
    }

}

StockService.instance = null;
StockService.getInstance = function () {
    if (StockService.instance == null) {
        StockService.instance = new StockService();
    }
    return StockService.instance;
};

module.exports = StockService.getInstance();