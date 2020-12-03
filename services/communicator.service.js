const ipc = require('electron').ipcRenderer;
class Communicator {

    setCategories(categoriesList) {
        // const categoryService = require('../repositories/category.service');
        // await dbStore.setCategories(categoriesList);
        ipc.sendSync('setCategories', categoriesList);
    }

    async getCategories(parentId) {
        const categories = await ipc.invoke('getCategories', parentId)
        return categories;
    }


    async setCustomers(customersList, entites_list, addresss_list, tiers_list, entity_rel_list) {
        await ipc.invoke('setCustomers', JSON.parse(customersList), JSON.parse(entites_list), JSON.parse(addresss_list), JSON.parse(tiers_list), JSON.parse(entity_rel_list))
    }


    // async getCustomers(val) {
    //     // return ipc.invoke('getCustomers');
    // }
    // async playSound() {
    //     console.log("playing sound...");
    //     return ipc.invoke('playSound');
    // }
    async searchCustomers(val) {
        const customers = await ipc.invoke('searchCustomers', val)
        return customers;
    }

    async setItems(itemsInfo, serialsList, pricesList, segmantsList, suppliersList, taxesList, taxesItemsRelation, suppliersItemsRelation, itemAlternativesRel, itemCategoriesRel, scaleBarcodeList, itemStockslist) {

        await ipc.invoke('setItems', JSON.parse(itemsInfo), JSON.parse(serialsList), JSON.parse(pricesList), JSON.parse(segmantsList), JSON.parse(suppliersList), JSON.parse(taxesList), JSON.parse(taxesItemsRelation), JSON.parse(suppliersItemsRelation), JSON.parse(itemAlternativesRel), JSON.parse(itemCategoriesRel), JSON.parse(scaleBarcodeList), JSON.parse(itemStockslist));
    }

    async getItems() {
        return ipc.invoke('getItems');
    }

    async getItemsByCategory(parentId, limit, offset) {
        const items = await ipc.invoke('getItemsByCategory', parentId, limit, offset);
        return items
    }

    async searchItems(type, value, offset, limit) {
        const items = await ipc.invoke('searchItems', type, value, offset, limit);
        return items
    }
    async searchBarcode(code) {
        const item = await ipc.invoke('searchBarcode', code);
        return item
    }

    async playSound() {
        // await ipc.invoke('playSound');
        var audio = new Audio('../assets/sound/item.mp3');
        audio.play().catch(error => console.log("errror " + error));
    }
    async getScaleFromBarcode(value) {
        const scale = await ipc.invoke('getScaleFromBarcode', value);
        return scale
    }
    async getItemFromScale(scale, barcode) {
        const item = await ipc.invoke('getItemFromScale', scale, barcode);
        return item
    }
    async updateStockQty(values) {

        await ipc.invoke('updateStockQty', JSON.parse(values));
    }
    async getQtyByStockId(stockId) {
        const newQty = await ipc.invoke('getQtyByStockId', JSON.parse(stockId));
        return newQty
    }
    async setInsuranceCompany(companies, companiesRatios, companiesTerms, companyRatiosRel, companyTermsRel) {
        await ipc.invoke('setCompanies', JSON.parse(companies), JSON.parse(companiesRatios), JSON.parse(companiesTerms), JSON.parse(companyRatiosRel), JSON.parse(companyTermsRel));
    }

    // obj.setInsuranceCompany(JSON.stringify(sqllightobject.companies),JSON.stringify(sqllightobject.companiesRatios),JSON.stringify(sqllightobject.companiesTerms),JSON.stringify(sqllightobject.companyTermsRel),JSON.stringify(sqllightobject.companyRatiosRel))
    async getInsuranceCompany() {
        const companies = await ipc.invoke('getCompanies');
        return companies;

    }
    async setCards(cards) {
        await ipc.invoke('setCards', cards);
    }

    async getCards() {
        const cards = await ipc.invoke('getCards');
        return cards;
    }


    async saveSale(saleObject) {
        const saved = await ipc.invoke('saveSale', saleObject);
        return saved;
    }
    async getSales(filter) {
        const sales = await ipc.invoke('getSales', filter);
        return sales;
    }
    async getFailedSales() {
        const sales = await ipc.invoke('getFailedSales');
        return sales;
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

