
var dbStore = function dbStore() {


    this.setCategories = async function (categoriesList) {
        let categoryService = require('../db/services/category.service');
        await categoryService.setCategories(categoriesList);
    }

    this.getCategories = async function () {
        let categoryService = require('../db/services/category.service');
        let categories = await categoryService.getCategories();
        return categories;
    }


    this.setCustomers = async function (customersList) {
        let customerService = require('../db/services/customer.service');
        await customerService.setCustomers(customersList);
    }


    this.getCustomers = async function (val) {
        let customerService = require('../db/services/customer.service');
        let customers = await customerService.searchCustomers(val);
        return customers;
    }
    this.searchCustomers = async function () {
        let customerService = require('../db/services/customer.service');
        let customers = await customerService.searchCustomers();
        return customers;
    }

    this.setItems = function (items) {
        let itemsService = require('../db/services/item.service');
        await itemsService.setItems(items);
    }

    this.getItems = async function () {
        let itemsService = require('../db/services/item.service');
        let items = await itemsService.getItems(items);
        return items
    }

    this.searchItems = function (type, value) {
        let itemsService = require('../db/services/item.service');
        let items = await itemsService.searchItems(type, value);
        return items
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


































