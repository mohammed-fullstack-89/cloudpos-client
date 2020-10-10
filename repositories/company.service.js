

var db = require('../models/index');



class CompanyService {


    async getCompanies() {
        let companyTable = db.model('company');
        let companies = [];
        companies = await companyTable.findAll({ include: { all: true, nested: true } });
        companies = JSON.stringify(companies);
        return companies;
    }


    setCompanies(args) {
        const companies = args[0];
        const companiesRatios = args[1];
        const companiesTerms = args[2];
        const companyRatiosRel = args[3];
        const companyTermsRel = args[4];

        const companyTable = db.model('company');
        const ratioTable = db.model('ratio');
        const termTable = db.model('term');
        const companyTermsRelTable = db.model('company_terms');
        const companyRatiosRelTable = db.model('company_ratios');

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


    // if (companyService.caller != companyService.getInstance) {
    //     throw new Error("This object cannot be instanciated");
    // }

}

CompanyService.instance = null;
CompanyService.getInstance = function () {
    if (CompanyService.instance === null) {
        CompanyService.instance = new CompanyService();
    }
    return CompanyService.instance;
}

module.exports = CompanyService.getInstance();
