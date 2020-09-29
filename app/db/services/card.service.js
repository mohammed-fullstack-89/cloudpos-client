

var db = require('../db.manager');
var cardService = function cardService() {


    this.getCards = async function () {
        var cardTable = db.model('cards');
        var cards = [];
        cards = await cardTable.findAll({ include: { all: true, nested: true } });
        cards = JSON.stringify(cards);
        console.log("cards : " + cards);
        return cards;
    }


    this.setCards = async function (cardsList) {
        console.log(cardsList);
        var cardTable = db.model("cards");
        await cardTable.bulkCreate(JSON.parse(cardsList), { returning: true });
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
