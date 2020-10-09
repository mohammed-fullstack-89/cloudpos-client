

var db = require('../../../models/index');
var companyService = function companyService() {


    this.getCompanies = async function () {
        let companyTable = db.model('company');
        let companies = [];
        companies = await companyTable.findAll({ include: { all: true, nested: true } });
        companies = JSON.stringify(companies);
        return companies;
    }


    this.setCompanies = function (args) {
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

        companyTable.bulkCreate(companies, { updateOnDuplicate: [...Object.keys(companyTable.rawAttributes)] });
        ratioTable.bulkCreate(companiesRatios, { updateOnDuplicate: [...Object.keys(ratioTable.rawAttributes)] });
        termTable.bulkCreate(companiesTerms, { updateOnDuplicate: [...Object.keys(termTable.rawAttributes)] });

        companyTermsRelTable.destroy({ truncate: true }).then(() => {
            companyTermsRelTable.bulkCreate(companyRatiosRel)

        })
        companyRatiosRelTable.destroy({ truncate: true }).then(() => {
            companyRatiosRelTable.bulkCreate(companyTermsRel)
        })

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
