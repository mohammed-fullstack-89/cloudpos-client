

let db = require('../../../models/index');
let cardService = function cardService() {


    this.getCards = async function () {
        let cardTable = db.model('card');
        let cards = [];
        cards = await cardTable.findAll();
        cards = JSON.stringify(cards);
        return cards;
    }


    this.setCards = function (cardsList) {
        console.log("2s2s2s2ss22s2s2s");
        console.log(cardsList);
        let cardTable = db.model('card');
        cardTable.bulkCreate(JSON.parse(cardsList), { updateOnDuplicate: Object.keys(cardTable.rawAttributes) });
    }

    if (cardService.caller != cardService.getInstance) {
        throw new Error("This object cannot be instanciated");
    }

}

cardService.instance = null;
cardService.getInstance = function () {
    if (this.instance === null) {
        this.instance = new cardService();
    }
    return this.instance;
}

module.exports = cardService.getInstance();
