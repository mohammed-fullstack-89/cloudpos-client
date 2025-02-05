const db = require('../models/index');
const ORDERTYPE = require('../models/order_status');
class SaleService {
    async saveSale(args) {
        try {
            let saleObject = JSON.parse(args[0]);
            let saleData = JSON.parse(saleObject.data);
            saleObject.data = saleData;
            const saleTable = db.model("sale");
            if (saleObject != [] && saleObject != undefined) {
                const result = await saleTable.findOne({
                    where: {
                        order_number: saleObject.order_number,
                        invoice_number: saleObject.invoice_number
                    }
                });
                if (!result) {
                    await saleTable.create(saleObject);
                } else {
                    await saleTable.update(saleObject, {
                        where: {
                            order_number: result.order_number,
                            invoice_number: result.invoice_number
                        }
                    });
                }
                return true;
            }
            return false;
        } catch (error) {
            console.log("error " + error);
            return false;
        }

    }

    async getSales(filterObject) {
        let filter = SaleFilter();
        filter = JSON.parse(filterObject);
        const saleTable = db.model("sale");
        const result = await saleTable.findAll({
            where: { filter },
            attributes: ['data'],
            limit: 20
        });
        const sales = JSON.stringify(result);
        return sales;
    }

    async getFailedSales() {
        const saleTable = db.model("sale");
        const result = await saleTable.findAll({
            where: {
                [db.Seq().Op.not]: {
                    status: ORDERTYPE.SUCCESS
                }
            },
            attributes: ['data'],
            limit: 20
        });
        const sales = JSON.stringify(result);
        return sales;
    }

    async deleteSalesInvoice() {
        const saleTable = db.model("sale");
        const result = await saleTable.destroy({
            truncate: true
        });
    }

    async updateSaleInvoice(invoice_number, status) {
        const saleTable = db.model("sale");
        await saleTable.update({ invoice_number: invoice_number, status: status }, {
            where: {
                invoice_number: invoice_number
            }
        });
    }
}


SaleService.instance = null;
SaleService.getInstance = function () {
    if (SaleService.instance === null) {
        SaleService.instance = new SaleService();
    }
    return SaleService.instance;
};

module.exports = SaleService.getInstance();
