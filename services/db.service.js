const { ipcRenderer } = require('electron');
const electron = require('electron');

const ipc = electron.ipcMain;

class DbStore {


    init() {

        ipc.on('setCategories', async (event, args) => {
            let categoryService = require('../repositories/category.service');
            await categoryService.setCategories(args)
            event.returnValue = "Done";

        });
        ipc.handle('getCategories', async (event, ...args) => {
            let categoryService = require('../repositories/category.service');
            let categories = await categoryService.getCategories(args[0]);
            return categories;

        })

        ipc.handle('setItems', async (event, ...args) => {
            try {
                let itemsService = require('../repositories/item.service');
                await itemsService.setItems(args);

            } catch (error) {
                console.log("error : " + error);
            }

        });


        ipc.handle('setCustomers', async (event, ...args) => {
            let customerService = require('../repositories/customer.service');
            await customerService.setCustomers(args);
            return;
        });
        // ipc.handle('getCustomers', async (event, ...args) => {
        //     let customerService = require('../repositories/customer.service');
        //     // console.log("asdsa " + args + "------------------=-==- " + args[0]);
        //     await customerService.getCustomers();
        //     return;
        // });

        ipc.handle('searchCustomers', async (event, ...args) => {
            let customerService = require('../repositories/customer.service');
            let customers = await customerService.searchCustomers(args[0]);
            return customers;

        });

        // });

        // this.setCategories = async function (categoriesList) {
        //     // let categoryService = require('../repositories/category.service');
        //     // categoryService.setCategories(categoriesList);
        // }

        // this.getCategories = async function () {
        //     let categoryService = require('../repositories/category.service');
        //     let categories = await categoryService.getCategories();
        //     return categories;
        // }


        // this.setCustomers = async function (customersList) {
        //     let customerService = require('../repositories/customer.service');
        //     await customerService.setCustomers(customersList);
        // }


        // this.getCustomers = async function (val) {
        //     let customerService = require('../repositories/customer.service');
        //     let customers = await customerService.searchCustomers(val);
        //     return customers;
        // }
        // this.searchCustomers = async function () {
        //     let customerService = require('../repositories/customer.service');
        //     let customers = await customerService.searchCustomers();
        //     return customers;
        // }

        // this.setItems = async function (items) {
        //     let itemsService = require('../repositories/item.service');
        //     await itemsService.setItems(items);
        // }

        // this.getItems = async function () {
        //     let itemsService = require('../repositories/item.service');
        //     let items = await itemsService.getItems(items);
        //     return items
        // }

        // this.searchItems = async function (type, value) {
        //     let itemsService = require('../repositories/item.service');
        //     let items = await itemsService.searchItems(type, value);
        //     return items
        // }

        ipc.handle('searchItems', async (event, ...args) => {
            let itemsService = require('../repositories/item.service');
            let items = await itemsService.searchItems(args);
            return items
        })
        ipc.handle('setCompanies', async (event, ...args) => {
            let companiesService = require('../repositories/company.service');
            await companiesService.setCompanies(args);
        })

        ipc.handle('getCompanies', async (event, ...args) => {
            let companiesService = require('../repositories/company.service');
            let companies = await companiesService.getCompanies();
            return companies
        })

        ipc.handle('setCards', async (event, ...args) => {
            let cardsService = require('../repositories/card.service');
            await cardsService.setCards(args[0]);
        })

        ipc.handle('getCards', async (event, ...args) => {
            let cardsService = require('../repositories/card.service');
            let cards = await cardsService.getCards();
            return cards
        })
        ipc.handle('getItemsByCategory', async (event, ...args) => {
            let itemsService = require('../repositories/item.service');
            let items = await itemsService.getItemsByCategory(args);
            return items
        })
        // ipc.handle('getItems', async (event, ...args) => {
        //     let itemsService = require('../repositories/item.service');
        //     let items = await itemsService.getItems( parentId, limit, offset);
        //     return items
        // })

        // this.getItemsByCategory = async function (parentId, limit, offset) {
        //     const items = ipc.invoke('getItems', parentId, limit, offset);
        //     return items
        // }
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


































