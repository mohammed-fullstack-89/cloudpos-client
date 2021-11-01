let db = require('../models/index');
class CardService {
    async getCards() {
        let cardTable = db.model('card');
        let cards = [];
        cards = JSON.stringify(await cardTable.findAll());
        return cards;
    }

    setCards(cardsList) {
        let cardTable = db.model('card');
        cardTable.bulkCreate(JSON.parse(cardsList), { updateOnDuplicate: Object.keys(cardTable.rawAttributes) });
    }
}

CardService.instance = null;
CardService.getInstance = function () {
    if (CardService.instance === null) {
        CardService.instance = new CardService();
    }
    return CardService.instance;
};

module.exports = CardService.getInstance();
