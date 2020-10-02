

let db = require('../../../models/index');
let itemService = function itemService() {


    this.getItems = async function () {
        let itemTable = db.model('items');
        let items = [];
        items = await itemTable.findAll();
        return items;
    }
    this.searchItems = async function (type, val) {
        let itemTable = db.model('letiants');
        let items = [];
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
        try {
            let itemTable = db.model("items");
            await itemTable.bulkCreate(JSON.parse(itemsList), { include: { all: true, nested: true, updateOnDuplicate:[]}, returning: true, nested: true });
        } catch (error) {
            console.log("error " + error);
        }

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
