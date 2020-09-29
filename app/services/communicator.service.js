const ipc = require('electron').ipcRenderer;
const dbStore = require('./service.db')
var communicator = function communicator() {


    this.setCategories = function (categoriesList) {
        // let categoryService = require('../db/services/category.service');
        // await dbStore.setCategories(categoriesList);
        ipc.sendSync('setCategories', categoriesList);
    }

    this.getCategories = async function (parentId) {

        let categories = await ipc.invoke('getCategories', parentId)

        return categories;
    }


    this.setCustomers = async function (customersList) {
        let customers = await ipc.invoke('setCustomers', customersList)
    }


    this.getCustomers = async function (val) {
        let customers = await ipc.invoke('getCustomers');
        return customers;
    }

    this.searchCustomers = async function (val) {
        let customers = await ipc.invoke('searchCustomers', val)
        return customers;
    }
    // this.searchCustomers = async function () {
    //     let customerService = require('../db/services/customer.service');
    //     let customers = await customerService.searchCustomers();
    //     return customers;
    // }

    this.setItems = async function (data) {
        await ipc.invoke('setItems', JSON.parse(data[0]).get_variants);
        return items;

        // let itemsService = require('../db/services/item.service');
        // await itemsService.setItems(items);
    }

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


    // this.setCompanies = async function (items) {
    //     let companiesService = require('../db/services/company.service');
    //     await companiesService.setItems(items);
    // }

    // this.getCompanies = async function () {
    //     let companiesService = require('../db/services/company.service');
    //     let companies = await companiesService.getItems(items);
    //     return companies
    // }
    // this.setCards = async function (items) {
    //     let cardsService = require('../db/services/card.service');
    //     await cardsService.setItems(cards);
    // }

    // this.getCards = async function () {
    //     let cardsService = require('../db/services/card.service');
    //     let cards = await cardsService.getItems(items);
    //     return cards
    // }

    if (communicator.caller != communicator.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
}

communicator.instance = null;

communicator.getInstance = function () {
    if (this.instance === null) {
        this.instance = new communicator();
    }
    return this.instance;
}

module.exports = communicator.getInstance();

