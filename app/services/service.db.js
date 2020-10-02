const { ipcRenderer } = require('electron');
const electron = require('electron');

const ipc = electron.ipcMain;

var dbStore = function dbStore() {


    this.init = () => {

        ipc.on('setCategories', async (event, args) => {
            let categoryService = require('../db/services/category.service');
            await categoryService.setCategories(args)
            event.returnValue = "Done";

        });
        ipc.handle('getCategories', async (event, ...args) => {
            let categoryService = require('../db/services/category.service');
            let categories = await categoryService.getCategories(args[0]);
            return categories;

        })
        ipc.handle('setItems', async (event, ...args) => {
            // try {
            //     let itemsService = require('../db/services/item.service');
            //     await itemsService.setItems(args[0]);
            //     return;
            // } catch (error) {
            //     console.log("dsadsd " + error);
            // }

        });


        ipc.handle('setCustomers', async (event, ...args) => {
            console.log("set cust2")
            let customerService = require('../db/services/customer.service');
            await customerService.setCustomers(args);
            return;
        });
        // ipc.handle('getCustomers', async (event, ...args) => {
        //     let customerService = require('../db/services/customer.service');
        //     // console.log("asdsa " + args + "------------------=-==- " + args[0]);
        //     await customerService.getCustomers();
        //     return;
        // });

        ipc.handle('searchCustomers', async (event, ...args) => {
            let customerService = require('../db/services/customer.service');
            let customers = await customerService.searchCustomers(args[0]);
            return customers;

        });

        // });

        // this.setCategories = async function (categoriesList) {
        //     // let categoryService = require('../db/services/category.service');
        //     // categoryService.setCategories(categoriesList);
        // }

        // this.getCategories = async function () {
        //     let categoryService = require('../db/services/category.service');
        //     let categories = await categoryService.getCategories();
        //     return categories;
        // }


        // this.setCustomers = async function (customersList) {
        //     let customerService = require('../db/services/customer.service');
        //     await customerService.setCustomers(customersList);
        // }


        // this.getCustomers = async function (val) {
        //     let customerService = require('../db/services/customer.service');
        //     let customers = await customerService.searchCustomers(val);
        //     return customers;
        // }
        // this.searchCustomers = async function () {
        //     let customerService = require('../db/services/customer.service');
        //     let customers = await customerService.searchCustomers();
        //     return customers;
        // }

        // this.setItems = async function (items) {
        //     let itemsService = require('../db/services/item.service');
        //     await itemsService.setItems(items);
        // }

        // this.getItems = async function () {
        //     let itemsService = require('../db/services/item.service');
        //     let items = await itemsService.getItems(items);
        //     return items
        // }

        // this.searchItems = async function (type, value) {
        //     let itemsService = require('../db/services/item.service');
        //     let items = await itemsService.searchItems(type, value);
        //     return items
        // }

        ipc.handle('setCompanies', async (event, ...args) => {
            let companiesService = require('../db/services/company.service');
            await companiesService.setCompanies(args);
        })

        ipc.handle('getCompanies', async (event, ...args) => {
            let companiesService = require('../db/services/company.service');
            let companies = await companiesService.getCompanies();
            return companies
        })

        ipc.handle('setCards', async (event, ...args) => {
            let cardsService = require('../db/services/card.service');
            await cardsService.setCards(args[0]);
        })

        ipc.handle('getCards', async (event, ...args) => {
            let cardsService = require('../db/services/card.service');
            let cards = await cardsService.getCards();
            return cards
        })

    }
    if (dbStore.caller != dbStore.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
}

dbStore.instance = null;

dbStore.getInstance = function () {
    if (this.instance === null) {
        this.instance = new dbStore();
    }
    return this.instance;
}

module.exports = dbStore.getInstance();


































