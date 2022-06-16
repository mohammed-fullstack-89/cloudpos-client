const electron = require('electron');

const ipc = electron.ipcMain;

class DbStore {
    constructor() {

        ipc.on('setCategories', async (event, args) => {
            const categoryService = require('../repositories/category-repo');
            await categoryService.setCategories(args);
            event.returnValue = "Done";
        });

        ipc.handle('getCategories', async (event, ...args) => {
            const categoryService = require('../repositories/category-repo');
            return await categoryService.getCategories(args[0]);
        });

        ipc.handle('deleteCustomer', async (event, ...args) => {
            try {
                const customerService = require('../repositories/customer-repo');
                await customerService.deleteCustomer(args[0]);
            } catch (error) {
                console.log("delete customer => error : " + error);
            }
        });

        ipc.handle('setItems', async (event, ...args) => {
            try {
                const itemsService = require('../repositories/item-repo');
                await itemsService.setItems(args);
            } catch (error) {
                console.log("setting items => error : " + error);
            }
        });

        ipc.handle('saveUsers', async (event, ...args) => {
            try {
                const userService = require('../repositories/user-repo');
                await userService.saveUsers(args[0]);
            } catch (error) {
                console.log("save users => error : " + error);
            }
        });

        ipc.handle('getUserByCode', async (event, ...args) => {
            try {
                const userService = require('../repositories/user-repo');
                return await userService.getUserByCode(args[0]);
            } catch (error) {
                console.log("error : " + error);
            }
        });

        ipc.handle('updateStockQty', (event, args) => {
            const itemsService = require('../repositories/item-repo');
            itemsService.updateStock(args);
        });

        ipc.handle('getStockData', async (event, args) => {
            const itemsService = require('../repositories/item-repo');
            return await itemsService.getStockData();
        });

        ipc.handle('setCustomers', async (event, ...args) => {
            const customerService = require('../repositories/customer-repo');
            await customerService.setCustomers(args);
        });

        ipc.handle('saveCustomer', async (event, ...args) => {
            const customerService = require('../repositories/customer-repo');
            await customerService.saveCustomer(args);
        });

        ipc.handle('getQtyByStockId', async (event, args) => {
            const itemsService = require('../repositories/item-repo');
            return await itemsService.getQtyByStock(args);
        });

        ipc.handle('searchCustomers', async (event, ...args) => {
            const customerService = require('../repositories/customer-repo');
            return await customerService.searchCustomers(args);
        });

        ipc.handle('searchItems', async (event, ...args) => {
            const itemsService = require('../repositories/item-repo');
            return await itemsService.searchItems(args);
        });

        ipc.handle('searchBarcode', async (event, ...args) => {
            const itemsService = require('../repositories/item-repo');
            return await itemsService.searchBarcode(args);
        });

        ipc.handle('getScaleFromBarcode', async (event, ...args) => {
            const itemsService = require('../repositories/item-repo');
            return await itemsService.getScaleFromBarcode(args);
        });

        ipc.handle('updateSerialQty', async (event, ...args) => {
            const itemsService = require('../repositories/item-repo');
            await itemsService.updateSerialQty(args);
        });

        ipc.handle('getItemFromScale', async (event, ...args) => {
            const itemsService = require('../repositories/item-repo');
            return await itemsService.getItemFromScale(args);
        });

        ipc.handle('setCompanies', async (event, ...args) => {
            const companiesService = require('../repositories/company-repo');
            await companiesService.setCompanies(args);
        });

        ipc.handle('getCompanies', async (event, ...args) => {
            const companiesService = require('../repositories/company-repo');
            return await companiesService.getCompanies();
        });

        ipc.handle('setCards', async (event, ...args) => {
            const cardsService = require('../repositories/card-repo');
            await cardsService.setCards(args[0]);
        });

        ipc.handle('getCards', async (event, ...args) => {
            const cardsService = require('../repositories/card-repo');
            return await cardsService.getCards();
        });

        ipc.handle('getItemsByCategory', async (event, ...args) => {
            const itemsService = require('../repositories/item-repo');
            return await itemsService.getItemsByCategory(args);
        });

        ipc.handle('saveSale', async (event, ...args) => {
            const saleService = require('../repositories/sale-repo');
            await saleService.saveSale(args);
        });

        ipc.handle('getSales', async (event, ...args) => {
            const saleService = require('../repositories/sale-repo');
            return await saleService.getSales(args);
        });

        ipc.handle('getFailedSales', async (event, ...args) => {
            const saleTable = require('../repositories/sale-repo');
            return await saleTable.getFailedSales();
        });

        ipc.handle('deleteSalesInvoice', async (event, ...args) => {
            const saleTable = require('../repositories/sale-repo');
            await saleTable.deleteSalesInvoice();
        });

        ipc.handle('updateSaleInvoice', async (event, ...args) => {
            const saleTable = require('../repositories/sale-repo');
            await saleTable.updateSaleInvoice(args[0], args[1]);
        });

        ipc.handle('getVariantStock', async (event, ...args) => {
            const stockTable = require('../repositories/stock-repo');
            return await stockTable.getStocksByVariantId(args[0]);
        });

        ipc.handle('setOrderTypes', async (event, ...args) => {
            const orderTypesService = require('../repositories/order-types-repo');
            await orderTypesService.setOrderTypes(args[0], args[1]);
        });

        ipc.handle('loadOrderTypes', async (event, ...args) => {
            const orderTypesService = require('../repositories/order-types-repo');
            return await orderTypesService.getOrderTypes();
        });

        ipc.handle('saveNotes', async (event, ...args) => {
            const notesService = require('../repositories/notes-repo');
            return await notesService.saveNotes(args[0]);
        });

        ipc.handle('getNoteByType', async (event, ...args) => {
            const notesService = require('../repositories/notes-repo');
            return await notesService.getNoteByType(args[0]);
        });
    }
}


DbStore.instance = null;
DbStore.getInstance = function () {
    if (DbStore.instance === null) {
        DbStore.instance = new DbStore();
    }
    return DbStore.instance;
}

module.exports = DbStore.getInstance();