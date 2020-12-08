

const models = require('../models/index');
var db = require('../models/index');



class CompanyService {


    async getCompanies() {
        let companyTable = db.model('company');
        let companies = [];
        // companies = await companyTable.findAll({ include: { all: true } });
        companies = await companyTable.findAll({
            include: [{ model: db.model('term'), as: 'company_terms', nested: false },
            { model: db.model('ratio'), as: 'company_ratio', nested: false }]
        });
        companies = JSON.stringify(companies);
        return companies;
    }


    async setCompanies(args) {
        const companies = args[0];
        const companiesRatios = args[1];
        const companiesTerms = args[2];
        const companyTermsRel = args[3];
        const companyRatiosRel = args[4];
        const companyTable = db.model('company');
        const ratioTable = db.model('ratio');
        const termTable = db.model('term');
        const companyTermsRelTable = db.model('company_term');
        const companyRatiosRelTable = db.model('company_ratios');
        try {
            if (companies != [] && companies != undefined) {
                await companyTable.destroy({ truncate: true });
                await companyTable.bulkCreate(companies);
                // companyTable.bulkCreate(companies, { updateOnDuplicate: [...Object.keys(companyTable.rawAttributes)] });
            }
        } catch (error) {
            console.log(" companies error " + error);
        }
        try {
            if (companiesRatios != [] && companiesRatios != undefined) {
                await ratioTable.destroy({ truncate: true });
                await ratioTable.bulkCreate(companiesRatios);
                // ratioTable.bulkCreate(companiesRatios, { updateOnDuplicate: [...Object.keys(ratioTable.rawAttributes)] });


            }
        } catch (error) {
            console.log(" companiesRatios error " + error);
        }

        try {
            if (companiesTerms != [] && companiesTerms != undefined) {

                await termTable.destroy({ truncate: true });
                await termTable.bulkCreate(companiesTerms);
                // termTable.bulkCreate(companiesTerms, { updateOnDuplicate: [...Object.keys(termTable.rawAttributes)] });

            }
        } catch (error) {
            console.log("companiesTerms error " + error);
        }

        try {
            if (companyTermsRel != [] && companyTermsRel != undefined) {
                await companyTermsRelTable.destroy({ truncate: true })
                await companyTermsRelTable.bulkCreate(companyTermsRel)
                // termTable.bulkCreate(companiesTerms, { updateOnDuplicate: [...Object.keys(termTable.rawAttributes)] });

            }
        } catch (error) {
            console.log("companiesTerms error " + error);
        }


        try {
            if (companyRatiosRel != [] && companyRatiosRel != undefined) {

                await companyRatiosRelTable.destroy({ truncate: true })
                await companyRatiosRelTable.bulkCreate(companyRatiosRel)

            }
        } catch (error) {
            console.log("companiesTerms error " + error);
        }

    }


}

CompanyService.instance = null;
CompanyService.getInstance = function () {
    if (CompanyService.instance === null) {
        CompanyService.instance = new CompanyService();
    }
    return CompanyService.instance;
}

module.exports = CompanyService.getInstance();
