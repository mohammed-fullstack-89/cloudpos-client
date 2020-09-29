

var db = require('../db.manager');
var itemService = function itemService() {


    this.getItems = async function () {
        var itemTable = db.model('items');
        var items = [];
        items = await itemTable.findAll();
        items = JSON.stringify(items);
        console.log("items : " + items);
        return items;
    }
    this.searchItems = async function (type, val) {
        var itemTable = db.model('variants');
        var items = [];
        items = await itemTable.findAll({
            where: {
                name: { [db.Seq().like]: '%val%' },
            }
        });
        items = JSON.stringify(items);
        console.log("items : " + items);
        return items;
    }

    this.setItems = async function (itemsList) {
        console.log(itemsList);
        var itemTable = db.model("variants");
        await itemTable.bulkCreate(itemsList);
    }

    if (itemService.caller != itemService.getInstance) {
        throw new Error("This object cannot be instanciated");
    }

}

itemService.instance = null;
itemService.getInstance = function () {
    if (this.instance === null) {
        this.instance = new itemService();
    }
    return this.instance;
}

module.exports = itemService.getInstance();
