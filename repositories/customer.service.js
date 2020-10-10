

let db = require('../models/index')
    , Seq = db.Seq();

class CustomerService {

    async getCustomers() {
        let customerTable = db.model('customers');
        let customers = [];
        customers = await customerTable.findAll({ include: { all: true, nested: true } });
        return customers;
    }

    async searchCustomers(val) {
        let customerTable = db.model('customer');
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
        console.log("customer : " + customers);
        return customers;
    }

    async setCustomers(args) {
        const customersList = args[0];
        const entites_list = args[1];
        const addresss_list = args[2];
        const tiers_list = args[3];
        const entity_rel_list = args[4];

        let customerTable = db.model("customer");
        let addressesTable = db.model("address");
        let tiersTable = db.model("tier");
        let entitesTable = db.model("entity");
        let customerEntitesRelTable = db.model("customer_entities");

        if (tiers_list != [] && tiers_list != undefined) {
            tiersTable.destroy({ truncate: true }).then(() => {
                tiersTable.bulkCreate(tiers_list);

            });
        }

        if (customersList != [] && customersList != undefined) {
            customerTable.destroy({ truncate: true }).then(() => {
                customerTable.bulkCreate(customersList);
            });
        }

        if (addresss_list != [] && addresss_list != undefined) {
            addressesTable.destroy({ truncate: true }).then(() => {
                addressesTable.bulkCreate(addresss_list);
            });
        }
        if (entites_list != [] && entites_list != undefined) {
            entitesTable.destroy({ truncate: true }).then(() => {
                entitesTable.bulkCreate(entites_list);
            });
        }


        if (entity_rel_list != [] && entity_rel_list != undefined) {
            customerEntitesRelTable.destroy({ truncate: true }).then(() => {
                customerEntitesRelTable.bulkCreate(entity_rel_list);
            });

        }


        // await customerTable.sequelize.query(
        //     "INSERT INTO entities_customers (customer_id, entity_id) VALUES ?;", JSON.parse(entity_rel_list));
    }

    // if (customerService.caller != customerService.getInstance) {
    //     throw new Error("This object cannot be instanciated");
    // }

}

CustomerService.instance = null;
CustomerService.getInstance = function () {
    if (CustomerService.instance === null) {
        CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
}

module.exports = CustomerService.getInstance();
