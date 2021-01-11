const electron = require('electron');

const ipc = electron.ipcMain;

class DbStore {
    constructor() {

        ipc.on('setCategories', async (event, args) => {
            let categoryService = require('../repositories/category-repo');
            await categoryService.setCategories(args)
            event.returnValue = "Done";

        });
        ipc.handle('getCategories', async (event, ...args) => {
            let categoryService = require('../repositories/category-repo');
            let categories = await categoryService.getCategories(args[0]);
            return categories;

        })
        ipc.handle('deleteCustomer', async (event, ...args) => {
            try {
                let customerService = require('../repositories/customer-repo');
                await customerService.deleteCustomer(args[0]);
            } catch (error) {
                console.log("error : " + error);
            }

        });

        ipc.handle('setItems', async (event, ...args) => {
            try {
                let itemsService = require('../repositories/item-repo');
                await itemsService.setItems(args);

            } catch (error) {
                console.log("error : " + error);
            }

        });

        ipc.handle('updateStockQty', (event, args) => {
            let itemsService = require('../repositories/item-repo');
            itemsService.updateStock(args);
        });
        // ipc.handle('getStockData', (event, args) => {
        //     let itemsService = require('../repositories/item-repo');
        //     itemsService.getStockData();
        // })

        ipc.handle('setCustomers', async (event, ...args) => {
            let customerService = require('../repositories/customer-repo');
            await customerService.setCustomers(args);
            return;
        });
        ipc.handle('saveCustomer', async (event, ...args) => {
            let customerService = require('../repositories/customer-repo');
            await customerService.saveCustomer(args[0]);
            return;
        });
        ipc.handle('getQtyByStockId', async (event, args) => {
            let itemsService = require('../repositories/item-repo');
            const newQty = await itemsService.getQtyByStock(args);
            return newQty;
        });


        ipc.handle('searchCustomers', async (event, ...args) => {
            let customerService = require('../repositories/customer-repo');
            let customers = await customerService.searchCustomers(args[0]);
            return customers;

        });


        // });

        // this.setCategories = async function (categoriesList) {
        //     // let categoryService = require('../repositories/category-repo');
        //     // categoryService.setCategories(categoriesList);
        // }

        // this.getCategories = async function () {
        //     let categoryService = require('../repositories/category-repo');
        //     let categories = await categoryService.getCategories();
        //     return categories;
        // }


        // this.setCustomers = async function (customersList) {
        //     let customerService = require('../repositories/customer-repo');
        //     await customerService.setCustomers(customersList);
        // }


        // this.getCustomers = async function (val) {
        //     let customerService = require('../repositories/customer-repo');
        //     let customers = await customerService.searchCustomers(val);
        //     return customers;
        // }
        // this.searchCustomers = async function () {
        //     let customerService = require('../repositories/customer-repo');
        //     let customers = await customerService.searchCustomers();
        //     return customers;
        // }

        // this.setItems = async function (items) {
        //     let itemsService = require('../repositories/item-repo');
        //     await itemsService.setItems(items);
        // }

        // this.getItems = async function () {
        //     let itemsService = require('../repositories/item-repo');
        //     let items = await itemsService.getItems(items);
        //     return items
        // }

        // this.searchItems = async function (type, value) {
        //     let itemsService = require('../repositories/item-repo');
        //     let items = await itemsService.searchItems(type, value);
        //     return items
        // }

        ipc.handle('searchItems', async (event, ...args) => {

            let itemsService = require('../repositories/item-repo');
            let items = await itemsService.searchItems(args);
            return items
        })
        ipc.handle('searchBarcode', async (event, ...args) => {

            let itemsService = require('../repositories/item-repo');
            let item = await itemsService.searchBarcode(args);
            return item
        })
        ipc.handle('getScaleFromBarcode', async (event, ...args) => {
            let itemsService = require('../repositories/item-repo');
            let scale = await itemsService.getScaleFromBarcode(args);
            return scale
        })
        ipc.handle('getItemFromScale', async (event, ...args) => {
            let itemsService = require('../repositories/item-repo');
            let item = await itemsService.getItemFromScale(args);
            return item
        })

        ipc.handle('setCompanies', async (event, ...args) => {
            let companiesService = require('../repositories/company-repo');
            await companiesService.setCompanies(args);
        })

        ipc.handle('getCompanies', async (event, ...args) => {
            let companiesService = require('../repositories/company-repo');
            let companies = await companiesService.getCompanies();
            return companies
        })

        ipc.handle('setCards', async (event, ...args) => {
            let cardsService = require('../repositories/card-repo');
            await cardsService.setCards(args[0]);
        })

        ipc.handle('getCards', async (event, ...args) => {
            let cardsService = require('../repositories/card-repo');
            let cards = await cardsService.getCards();
            return cards
        })
        ipc.handle('getItemsByCategory', async (event, ...args) => {
            let itemsService = require('../repositories/item-repo');
            let items = await itemsService.getItemsByCategory(args);
            return items
        })
        // ipc.handle('getItems', async (event, ...args) => {
        //     let itemsService = require('../repositories/item-repo');
        //     let items = await itemsService.getItems( parentId, limit, offset);
        //     return items
        // })

        // this.getItemsByCategory = async function (parentId, limit, offset) {
        //     const items = ipc.invoke('getItems', parentId, limit, offset);
        //     return items
        // }

        ipc.handle('saveSale', async (event, ...args) => {
            let saleService = require('../repositories/sale-repo');
            let saveStatus = await saleService.saveSale(args);
            return saveStatus;
        });

        ipc.handle('getSales', async (event, ...args) => {
            let saleService = require('../repositories/sale-repo');
            let sales = await saleService.getSales(args);
            return sales;
        })
        ipc.handle('getFailedSales', async (event, ...args) => {
            const saleTable = require('../repositories/sale-repo');
            const sales = await saleTable.getFailedSales();
            return sales;
        });
        ipc.handle('deleteSalesInvoice', async (event, ...args) => {
            const saleTable = require('../repositories/sale-repo');
            await saleTable.deleteSalesInvoice();

        })
        ipc.handle('updateSaleInvoice', async (event, ...args) => {
            const saleTable = require('../repositories/sale-repo');
            await saleTable.updateSaleInvoice(args[0], args[1]);

        })
    }
}

// if (DbStore.caller != DbStore.getInstance) {
//     throw new Error("This object cannot be instanciated");
// }


DbStore.instance = null;

DbStore.getInstance = function () {
    if (DbStore.instance === null) {
        DbStore.instance = new DbStore();
    }
    return DbStore.instance;
}

module.exports = DbStore.getInstance();


































