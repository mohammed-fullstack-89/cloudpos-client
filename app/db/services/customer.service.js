

var db = require('../db.manager');
var customerService = function customerService() {


    this.getCustomers = async function () {
        var customerTable = db.model('customers');
        var customers = [];
        customers = await customerTable.findAll({ include: { all: true, nested: true } });
        customers = JSON.stringify(customers);
        console.log("customers : " + customers);
        return customers;
    }
    this.searchCustomers = async function (val) {
        var customerTable = db.model('customers');
        var customers = [];
        customers = await customerTable.findAll({
            include: { all: true, nested: true },
            where: {
                name: { [db.Seq().like]: '%${val}%' },
            }
        });
        customers = JSON.stringify(customers);
        console.log("customers : " + customers);
        return customers;
    }

    this.setCustomers = async function (customersList) {
        console.log(customersList);
        var customerTable = db.model("customers");
        await customerTable.bulkCreate(JSON.parse(customersList), { returning: true });
    }

    if (customerService.caller != customerService.getInstance) {
        throw new Error("This object cannot be instanciated");
    }

}

customerService.instance = null;
customerService.getInstance = function () {
    if (this.instance === null) {
        this.instance = new customerService();
    }
    return this.instance;
}

module.exports = customerService.getInstance();
