const db = require('../models/index');
class StockService {

    async getStocks(variantId) {
        try {
            console.log('test', variantId);
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