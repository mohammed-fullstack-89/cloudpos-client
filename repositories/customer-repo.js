let db = require('../models/index'), Seq = db.Seq();
class CustomerService {

    async getCustomers() {
        let customerTable = db.model('customers');
        let customers = [];
        customers = await customerTable.findAll({ include: { all: true, nested: true } });
        return customers;
    }

    async searchCustomers(args) {
        let customerTable = db.model('customer');
        let customers = [];
        const val = args[0];
        const offset = args[1];
        const limit = args[2];
        if (val == null || val == undefined || val == "undefined") {
            customers = await customerTable.findAll({ include: { all: true, nested: true } });
        } else {
            customers = await customerTable.findAll({
                include: { all: true, nested: true },
                where: {
                    [Seq.Op.or]: {
                        name: { [Seq.Op.like]: `%${val}%` },
                        nick_name: { [Seq.Op.like]: `%${val}%` },
                        mobile_1: { [Seq.Op.like]: `%${val}%` },
                        mobile_2: { [Seq.Op.like]: `%${val}%` },
                    }
                },
                limit,
                offset
            });
        }
        customers = JSON.stringify(customers);

        return customers;
    }

    async deleteCustomer(customerId) {
        let customerTable = db.model('customer');
        await customerTable.destroy({
            where: {
                id: customerId
            }
        });
    }

    async saveCustomer(args) {
        const customer = (args[0])[0];
        const addressesList = args[1];
        const customerEntitiesRel = args[2];
        const customerId = args[3];
        let customerTable = db.model("customer");
        let addressesTable = db.model("address");
        let customerEntitesRelTable = db.model("customer_entity");

        if (customerId) {
            try {
                await addressesTable.destroy({ where: { customer_id: customerId } });
            } catch (error) {
                console.log("error destroy addressesTable" + error);
            }

            try {
                await customerEntitesRelTable.destroy({ where: { customer_id: customerId } });
            } catch (error) {
                console.log("error destroy customerEntitesRelTable" + error);
            }
        }

        try {
            if (customer != "" && customer != undefined) {
                await customerTable.upsert(customer);
            }
        } catch (error) {
            console.log("error upsert customerTable" + error);
        }

        try {
            if (addressesList != "" && addressesList != undefined) {
                await addressesTable.bulkCreate(addressesList);
            }
        } catch (error) {
            console.log("error bulkCreate addressesTable" + error);
        }

        try {
            if (customerEntitiesRel != "" && customerEntitiesRel != undefined) {
                await customerEntitesRelTable.bulkCreate(customerEntitiesRel);
            }
        } catch (error) {
            console.log("error bulkCreate customerEntitesRelTable" + error);
        }
        return true;
    }

    async setCustomers(args) {
        try {
            const customersList = args[0];
            const entites_list = args[1];
            const addresss_list = args[2];
            const tiers_list = args[3];
            const entity_rel_list = args[4];
            const price_lists = args[5];
            let customerTable = db.model("customer");
            let addressesTable = db.model("address");
            let tiersTable = db.model("tier");
            let entitesTable = db.model("entity");
            let customerEntitesRelTable = db.model("customer_entity");
            let priceList = db.model("price_list");

            try {
                if (tiers_list != [] && tiers_list != undefined) {
                    await tiersTable.destroy({ truncate: true });
                    await tiersTable.bulkCreate(tiers_list);
                }
            } catch (error) {
                console.log("error destroy/bulkCreate tiersTable" + error);
            }

            try {
                if (customersList != [] && customersList != undefined) {
                    await customerTable.destroy({ truncate: true });
                    await customerTable.bulkCreate(customersList);
                }
            } catch (error) {
                console.log("error destroy/bulkCreate customerTable" + error);
            }

            try {
                if (addresss_list != [] && addresss_list != undefined) {
                    await addressesTable.destroy({ truncate: true });
                    await addressesTable.bulkCreate(addresss_list);
                }
            } catch (error) {
                console.log("error destroy/bulkCreate addressesTable" + error);
            }

            try {
                if (entites_list != [] && entites_list != undefined) {
                    await entitesTable.destroy({ truncate: true });
                    await entitesTable.bulkCreate(entites_list);
                }
            } catch (error) {
                console.log("error destroy/bulkCreate entitesTable" + error);
            }

            try {
                if (entity_rel_list != [] && entity_rel_list != undefined) {
                    await customerEntitesRelTable.destroy({ truncate: true });
                    await customerEntitesRelTable.bulkCreate(entity_rel_list);
                }
            } catch (error) {
                console.log("error destroy/bulkCreate customerEntitesRelTable" + error);
            }

            try {
                if (price_lists != [] && price_lists != undefined) {
                    await priceList.bulkCreate(price_lists, { include: { all: true, nested: true }, updateOnDuplicate: Object.keys(priceList.rawAttributes) });
                }
            } catch (error) {
                console.log("error destroy/bulkCreate priceListTable", error);
            }
        } catch (error) {
            console.log("error setCustomers: " + error);
        }

    }
}

CustomerService.instance = null;
CustomerService.getInstance = function () {
    if (CustomerService.instance === null) {
        CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
};

module.exports = CustomerService.getInstance();
