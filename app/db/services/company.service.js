

var db = require('../db.manager');
var companyService = function companyService() {


    this.getCompanies = async function () {
        var companyTable = db.model('companies');
        var companies = [];
        companies = await companyTable.findAll({ include: { all: true, nested: true } });
        companies = JSON.stringify(companies);
        console.log("companies : " + companies);
        return companies;
    }


    this.setCompanies = async function (companiesList) {
        console.log(companiesList);
        var companyTable = db.model("companies");
        await companyTable.bulkCreate(JSON.parse(companiesList), { returning: true });
    }

    if (companyService.caller != companyService.getInstance) {
        throw new Error("This object cannot be instanciated");
    }

}

companyService.instance = null;
companyService.getInstance = function () {
    if (this.instance === null) {
        this.instance = new companyService();
    }
    return this.instance;
}

module.exports = companyService.getInstance();
