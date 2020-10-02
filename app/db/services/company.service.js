

var db = require('../../../models/index');
var companyService = function companyService() {


    this.getCompanies = async function () {
        let companyTable = db.model('company');
        let companies = [];
        companies = await companyTable.findAll({ include: { all: true, nested: true } });
        return companies;
    }


    this.setCompanies = async function (args) {
        companies = args[0];
        companiesRatios = args[1];
        companiesTerms = args[2];
        companyRatiosRel = args[3];
        companyTermsRel = args[4];
        console.log(companyRatiosRel);
        console.log(companyTermsRel);
        let companyTable = db.model('company');
        let ratioTable = db.model('ratio');
        let termTable = db.model('term');
        let companyTermsRelTable = db.model('company_terms');
        let companyRatiosRelTable = db.model('company_ratios');

        console.log("sdds " + Object.keys(companyTable.rawAttributes));
        await companyTable.bulkCreate(companies, { updateOnDuplicate: [...Object.keys(companyTable.rawAttributes)] });
        await ratioTable.bulkCreate(companiesRatios, { updateOnDuplicate: [...Object.keys(ratioTable.rawAttributes)] });
        await termTable.bulkCreate(companiesTerms, { updateOnDuplicate: [...Object.keys(termTable.rawAttributes)] });
        await companyTermsRelTable.destroy({ truncate: true });
        await companyRatiosRelTable.destroy({ truncate: true });
        await companyTermsRelTable.bulkCreate(companyRatiosRel);
        await companyRatiosRelTable.bulkCreate(companyTermsRel);

        // await companyTable.bulkCreate();
        // await companyTable.bulkCreate();
        // await companyTable.bulkCreate();
        // await companyTable.sequelize.query(
        //     "DELETE FROM companies_ratios ;", {
        //     type: companyTable.sequelize.QueryTypes.DELETE
        // });
        // await companyTable.sequelize.query(
        //     "DELETE FROM companies_terms;", {
        //     type: companyTable.sequelize.QueryTypes.DELETE
        // });
        // const insertedCompanies = await companyTable.bulkCreate(companies, { include: { all: true, nested: true, updateOnDuplicate: [...Object.keys(db.model('ratio').rawAttributes), ...Object.keys(db.model('term').rawAttributes)], cascade: true, }, updateOnDuplicate: [...Object.keys(companyTable.rawAttributes)], returning: true });
        // console.log("setCompanies': " + insertedCompanies);
        // await insertedCompanies.setTerms(companiesTerms);
        // await insertedCompanies.setRatios(companiesRatios);
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
