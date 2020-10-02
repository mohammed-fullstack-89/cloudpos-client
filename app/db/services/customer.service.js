

let db = require('../../../models/index')
    , Seq = db.Seq();
let customerService = function customerService() {


    this.getCustomers = async function () {
        let customerTable = db.model('customers');
        let customers = [];
        customers = await customerTable.findAll({ include: { all: true, nested: true } });
        return customers;
    }

    this.searchCustomers = async function (val) {
        let customerTable = db.model('customers');
        let customers = [];
        if (val == null || val == undefined || val == "undefined") {
            customers = await customerTable.findAll({ include: { all: true, nested: true } });
        }
        else {
            customers = await customerTable.findAll({
                include: { all: true, nested: true, },

                where: {
                    name: { [Seq.Op.like]: `%${val}%` },
                }
            });
        }
        customers = JSON.stringify(customers);
        console.log("customers : " + customers);
        return customers;
    }
    this.setCustomers = async function (args) {
        customersList = args[0];
        entites_list = args[1];
        addresss_list = args[2];
        tiers_list = args[3];
        entity_rel_list = args[4];

        let customerTable = db.model("customer");
        let addressesTable = db.model("address");
        let tiersTable = db.model("tier");
        let entitesTable = db.model("entity");
        let customerEntitesRelTable = db.model("customer_entities");

        if (tiers_list != [] && tiers_list != undefined)
            await tiersTable.bulkCreate(tiers_list, { updateOnDuplicate: [...Object.keys(tiersTable.rawAttributes)] });
        if (customersList != [] && customersList != undefined)
            await customerTable.bulkCreate(customersList, { updateOnDuplicate: [...Object.keys(customerTable.rawAttributes)] });
        if (addresss_list != [] && addresss_list != undefined)
            await addressesTable.bulkCreate(addresss_list, { updateOnDuplicate: [...Object.keys(addressesTable.rawAttributes)] });
        if (entites_list != [] && entites_list != undefined)
            await entitesTable.bulkCreate(entites_list, { updateOnDuplicate: [...Object.keys(entitesTable.rawAttributes)] });

        if (entity_rel_list != [] && entity_rel_list != undefined) {
            await customerEntitesRelTable.destroy({ truncate: true });
            await customerEntitesRelTable.bulkCreate(entity_rel_list);
        }


        // await customerTable.sequelize.query(
        //     "INSERT INTO entities_customers (customer_id, entity_id) VALUES ?;", JSON.parse(entity_rel_list));
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
