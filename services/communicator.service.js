const ipc = require('electron').ipcRenderer;

class Communicator {

    setCategories(categoriesList) {
        // let categoryService = require('../repositories/category.service');
        // await dbStore.setCategories(categoriesList);
        ipc.sendSync('setCategories', categoriesList);
    }

    async getCategories(parentId) {
        let categories = await ipc.invoke('getCategories', parentId)

        return categories;
    }


    async setCustomers(customersList, entites_list, addresss_list, tiers_list, entity_rel_list) {

        await ipc.invoke('setCustomers', JSON.parse(customersList), JSON.parse(entites_list), JSON.parse(addresss_list), JSON.parse(tiers_list), JSON.parse(entity_rel_list))
    }


    async getCustomers(val) {
        // return ipc.invoke('getCustomers');
    }

    async searchCustomers(val) {
        const customers = await ipc.invoke('searchCustomers', val)
        return customers;
    }

    async setItems(itemsInfo, serialsList, alternatives, pricesList, segmantsList, suppliersList, taxesList, taxesItemsRelation, suppliersItemsRelation, itemAlternativesRel, itemCategoriesRel) {

        await ipc.invoke('setItems', JSON.parse(itemsInfo), JSON.parse(serialsList), JSON.parse(alternatives), JSON.parse(pricesList), JSON.parse(segmantsList), JSON.parse(suppliersList), JSON.parse(taxesList), JSON.parse(taxesItemsRelation), JSON.parse(suppliersItemsRelation), JSON.parse(itemAlternativesRel), JSON.parse(itemCategoriesRel));

    }

    async getItems() {
        return ipc.invoke('getItems');
    }

    async getItemsByCategory(parentId, limit, offset) {
        const items = await ipc.invoke('getItemsByCategory', parentId, limit, offset);
        return items
    }

    async searchItems(type, value) {
        const items = await ipc.invoke('searchItems', type, value);
        return items
    }

    async updateStockQty(values) {

        await ipc.invoke('updateStockQty', JSON.parse(values));
    }
    async getQtyByStockId(stockId) {
        let newQty = await ipc.invoke('getQtyByStockId', JSON.parse(stockId));
        return newQty
    }
    async setInsuranceCompany(companies, companiesRatios, companiesTerms, companyRatiosRel, companyTermsRel) {
        await ipc.invoke('setCompanies', JSON.parse(companies), JSON.parse(companiesRatios), JSON.parse(companiesTerms), JSON.parse(companyRatiosRel), JSON.parse(companyTermsRel));
    }

    // obj.setInsuranceCompany(JSON.stringify(sqllightobject.companies),JSON.stringify(sqllightobject.companiesRatios),JSON.stringify(sqllightobject.companiesTerms),JSON.stringify(sqllightobject.companyTermsRel),JSON.stringify(sqllightobject.companyRatiosRel))
    async getInsuranceCompany() {
        let companies = await ipc.invoke('getCompanies');
        return companies;

    }
    async setCards(cards) {
        await ipc.invoke('setCards', cards);
    }

    async getCards() {
        let cards = await ipc.invoke('getCards');
        return cards;
    }

    //     if(Communicator.caller != Communicator.getInstance) {
    //     throw new Error("This object cannot be instanciated");
    // }
}

Communicator.instance = null;

Communicator.getInstance = function () {
    if (Communicator.instance === null) {
        Communicator.instance = new Communicator();
    }
    return Communicator.instance;
}

module.exports = Communicator.getInstance();

