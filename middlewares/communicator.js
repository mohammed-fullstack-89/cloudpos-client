const ipc = require('electron').ipcRenderer;

class CommunicatorMiddleware {

    setCategories(categoriesList, force) { ipc.sendSync('setCategories', categoriesList, force); }

    async getCategories(parentId) { return await ipc.invoke('getCategories', parentId); }

    async setCustomers(customersList, entites_list, addresss_list, tiers_list, entity_rel_list) {
        await ipc.invoke('setCustomers', JSON.parse(customersList), JSON.parse(entites_list), JSON.parse(addresss_list), JSON.parse(tiers_list), JSON.parse(entity_rel_list))
    }

    async saveCustomer(customer, addressesList, customerEntitiesRel, customerId) {
        await ipc.invoke('saveCustomer', JSON.parse(customer), JSON.parse(addressesList), JSON.parse(customerEntitiesRel), customerId)
    }

    async deleteCustomer(customerId) { await ipc.invoke('deleteCustomer', customerId); }

    async saveUsers(usersArray) { await ipc.invoke('saveUsers', JSON.parse(usersArray)); }

    async getUserByCode(code) { return ipc.invoke('getUserByCode', code); }

    async playSound(type) { await ipc.invoke('playSound', type); }

    async searchCustomers(val, offset, limit) {
        return await ipc.invoke('searchCustomers', val, offset, limit);
    }

    async setItems(itemsInfo, serialsList, pricesList, segmantsList, suppliersList, taxesList, taxesItemsRelation, suppliersItemsRelation, itemAlternativesRel, itemCategoriesRel, scaleBarcodeList, itemStockslist, itemManufacturingList, itemsUnitsList, itemsSizesList, itemsColorsList, itemsBrandsList, force) {
        try {
            await ipc.invoke('setItems', JSON.parse(itemsInfo), JSON.parse(serialsList), JSON.parse(pricesList), JSON.parse(segmantsList), JSON.parse(suppliersList), JSON.parse(taxesList), JSON.parse(taxesItemsRelation), JSON.parse(suppliersItemsRelation), JSON.parse(itemAlternativesRel), JSON.parse(itemCategoriesRel), JSON.parse(scaleBarcodeList), JSON.parse(itemStockslist), JSON.parse(itemManufacturingList), JSON.parse(itemsUnitsList), JSON.parse(itemsSizesList), JSON.parse(itemsColorsList), JSON.parse(itemsBrandsList), JSON.parse(force));
        } catch (error) {
            console.log("error : " + error);
        }
    }

    async getItems() { return ipc.invoke('getItems'); }

    async getItemsByCategory(parentId, offset, limit) {
        return await ipc.invoke('getItemsByCategory', parentId, limit, offset);
    }

    async searchItems(type, value, offset, limit) {
        return await ipc.invoke('searchItems', type, value, offset, limit);
    }

    async updateSerialQty(serialId, qty) {
        return await ipc.invoke('updateSerialQty', serialId, qty);
    }

    async searchBarcode(code) { return await ipc.invoke('searchBarcode', code); }

    async getScaleFromBarcode(value) { return await ipc.invoke('getScaleFromBarcode', value); }

    async getItemFromScale(scale, barcode) {
        return await ipc.invoke('getItemFromScale', scale, barcode);
    }

    async updateStockQty(values) { await ipc.invoke('updateStockQty', JSON.parse(values)); }

    async getQtyByStockId(stockId) {
        return await ipc.invoke('getQtyByStockId', stockId);
    }

    async setInsuranceCompany(companies, companiesRatios, companiesTerms, companyRatiosRel, companyTermsRel) {
        await ipc.invoke('setCompanies', JSON.parse(companies), JSON.parse(companiesRatios), JSON.parse(companiesTerms), JSON.parse(companyRatiosRel), JSON.parse(companyTermsRel));
    }

    async getInsuranceCompany() { return await ipc.invoke('getCompanies'); }

    async setCards(cards) { await ipc.invoke('setCards', cards); }

    async getCards() { return await ipc.invoke('getCards'); }

    async saveSale(saleObject) { return await ipc.invoke('saveSale', saleObject); }

    async getSales(filter) { return await ipc.invoke('getSales', filter); }

    async getFailedSales() { return await ipc.invoke('getFailedSales'); }

    async deleteSalesInvoice() { return await ipc.invoke('deleteSalesInvoice'); }

    async updateSaleInvoice(invoice_number, status) {
        return await ipc.invoke('updateSaleInvoice', invoice_number, status);
    }

    async getVariantStock(variant_id) {
        return await ipc.invoke('getVariantStock', variant_id);
    }

    connectToLogger(identifier) { ipc.invoke('connectToLogger', identifier); }

    async loadOrderTypes() { return await ipc.invoke('loadOrderTypes'); }

    async saveOrderTypes(types) { await ipc.invoke('setOrderTypes', types); }

    async saveNotes(notes) { await ipc.invoke('saveNotes', notes); }

    async getNoteByType(type) { return await ipc.invoke('getNoteByType', type); }

}

CommunicatorMiddleware.instance = null;

CommunicatorMiddleware.getInstance = function () {
    if (CommunicatorMiddleware.instance === null) {
        CommunicatorMiddleware.instance = new CommunicatorMiddleware();
    }
    return CommunicatorMiddleware.instance;
};

module.exports = CommunicatorMiddleware.getInstance();

