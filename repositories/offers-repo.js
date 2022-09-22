var db = require('../models/index');
class OffersService {

    async getOffersByType(type) {
        let offersTable = db.model('offers');
        let offers = [];
        offers = JSON.stringify(await offersTable.findAll({ where: { promotion_type: type } }));
        return offers;
    }

    saveOffers(offersList) {
        let offersTable = db.model('offers');
        offersTable.bulkCreate(JSON.parse(offersList), { updateOnDuplicate: Object.keys(offersTable.rawAttributes) });
    }
}

OffersService.instance = null;
OffersService.getInstance = function () {
    if (OffersService.instance === null) {
        OffersService.instance = new CompanyService();
    }
    return OffersService.instance;
};

module.exports = OffersService.getInstance();