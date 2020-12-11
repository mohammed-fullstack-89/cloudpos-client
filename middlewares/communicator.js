const ipc = require('electron').ipcRenderer;

class CommunicatorMiddleware {

    setCategories(categoriesList) {
        ipc.sendSync('setCategories', categoriesList);
    }

    async getCategories(parentId) {
        const categories = await ipc.invoke('getCategories', parentId)
        return categories;
    }

    async setCustomers(customersList, entites_list, addresss_list, tiers_list, entity_rel_list) {
        await ipc.invoke('setCustomers', JSON.parse(customersList), JSON.parse(entites_list), JSON.parse(addresss_list), JSON.parse(tiers_list), JSON.parse(entity_rel_list))
    }


    async playSound(type) {
        await ipc.invoke('playSound', type);
    }
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

    async getItemsByCategory(parentId, offset, limit) {
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
    // async getStockData(values) {

    //     const stockData = await ipc.invoke('getStockData');
    //     return stockData;
    // }

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
    async deleteSalesInvoice() {
        const sales = await ipc.invoke('deleteSalesInvoice');
        return sales;
    }
    async updateSaleInvoice(invoice_number, status) {
        const sales = await ipc.invoke('updateSaleInvoice', invoice_number, status);
        return sales;
    }

}

// if (CommunicatorMiddleware.caller != CommunicatorMiddleware.getInstance) {
//     throw new Error("This object cannot be instanciated");
// }
CommunicatorMiddleware.instance = null;

CommunicatorMiddleware.getInstance = function () {
    if (CommunicatorMiddleware.instance === null) {
        CommunicatorMiddleware.instance = new CommunicatorMiddleware();
    }
    return CommunicatorMiddleware.instance;
}

module.exports = CommunicatorMiddleware.getInstance();

