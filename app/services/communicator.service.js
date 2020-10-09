const ipc = require('electron').ipcRenderer;
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


    this.setCustomers = async function (customersList, entites_list, addresss_list, tiers_list, entity_rel_list) {

        await ipc.invoke('setCustomers', JSON.parse(customersList), JSON.parse(entites_list), JSON.parse(addresss_list), JSON.parse(tiers_list), JSON.parse(entity_rel_list))
    }


    this.getCustomers = async function (val) {
        return ipc.invoke('getCustomers');
    }

    this.searchCustomers = async function (val) {
        const customers = await ipc.invoke('searchCustomers', val)
        return customers;
    }

    this.setItems = async function (itemsInfo, serialsList, alternatives, pricesList, segmantsList, suppliersList, taxesList, taxesItemsRelation, suppliersItemsRelation, itemAlternativesRel, itemCategoriesRel) {

        await ipc.invoke('setItems', JSON.parse(itemsInfo), JSON.parse(serialsList), JSON.parse(alternatives), JSON.parse(pricesList), JSON.parse(segmantsList), JSON.parse(suppliersList), JSON.parse(taxesList), JSON.parse(taxesItemsRelation), JSON.parse(suppliersItemsRelation), JSON.parse(itemAlternativesRel), JSON.parse(itemCategoriesRel));

        // let itemsService = require('../db/services/item.service');
        // await itemsService.setItems(items);
    }

    this.getItems = async function () {
        return ipc.invoke('getItems');

    }
    this.getItemsByCategory = async function (parentId, limit, offset) {
        const items = await ipc.invoke('getItemsByCategory', parentId, limit, offset);
        return items
    }

    this.searchItems = async function (type, value) {
        const items = await ipc.invoke('searchItems', type, value);
        return items
    }


    this.setInsuranceCompany = async function (companies, companiesRatios, companiesTerms, companyRatiosRel, companyTermsRel) {
        await ipc.invoke('setCompanies', JSON.parse(companies), JSON.parse(companiesRatios), JSON.parse(companiesTerms), JSON.parse(companyRatiosRel), JSON.parse(companyTermsRel));
    }
    // obj.setInsuranceCompany(JSON.stringify(sqllightobject.companies),JSON.stringify(sqllightobject.companiesRatios),JSON.stringify(sqllightobject.companiesTerms),JSON.stringify(sqllightobject.companyTermsRel),JSON.stringify(sqllightobject.companyRatiosRel))
    this.getInsuranceCompany = async function () {
        let companies = await ipc.invoke('getCompanies');
        return companies;

    }
    this.setCards = async function (cards) {
        await ipc.invoke('setCards', cards);

    }

    this.getCards = async function () {
        let cards = await ipc.invoke('getCards');
        return cards;
    }

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

