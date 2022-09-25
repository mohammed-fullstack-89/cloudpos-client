var db = require('../models/index');
class OffersService {

    async getOffersByType(type) {
        let offersTable = db.model('offers');
        let offers = [];
        offers = JSON.stringify(await offersTable.findAll({ where: { promotion_type: type } }));
        return offers;
    }

   async saveOffers(offersList) {
        let offersTable = db.model('offers');
        await offersTable.destroy({ truncate: true });
        offersTable.bulkCreate(JSON.parse(offersList), { updateOnDuplicate: Object.keys(offersTable.rawAttributes) });
    }
}

OffersService.instance = null;
OffersService.getInstance = function () {
    if (OffersService.instance === null) {
        OffersService.instance = new OffersService();
    }
    return OffersService.instance;
};

module.exports = OffersService.getInstance();