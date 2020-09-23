
var dbStore = function dbStore() {


    this.setCategories = async function (categoriesList) {
        var categoryService = require('../db/services/category.service');
        await categoryService.setCategories(categoriesList);
    }

    this.getCategories = async function () {
        var categoryService = require('../db/services/category.service');
        var categories = await categoryService.getCategories();
        return categories;
    }


    this.setCustomers = async function (customersList) {
        var customerService = require('../db/services/customer.service');
        await customerService.setCustomers(customersList);
    }


    this.getCustomers = async function (val) {
        var customerService = require('../db/services/customer.service');
        var customers = await customerService.searchCustomers(val);
        return customers;
    }
    this.getCustomers = async function () {
        var customerService = require('../db/services/customer.service');
        var customers = await customerService.getCustomers();
        return customers;
    }

    this.setItems = function () { }
    this.getItems = function () { }


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


































