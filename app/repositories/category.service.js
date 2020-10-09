
// const remote = require('electron').remote;

// const db = remote.getGlobal('db');
var db = require('../../../models/index')
    , Seq = db.Seq();
var categoryService = function categoryService() {


    this.getCategories = async function (parentId) {

        let categoryTable = db.model('category');
        let categories = [];
        categories = await categoryTable.findAll({
            where: {
                parent: parentId == undefined ? null : parentId
            }
        });
        categories = JSON.stringify(categories);
        return categories;
    }

    this.setCategories = function (categoriesList) {
        let categoryTable = db.model("category");
        categoryTable.bulkCreate(JSON.parse(categoriesList), { updateOnDuplicate: [...Object.keys(categoryTable.rawAttributes)] });
        console.log("insert is complete");
    }

    if (categoryService.caller != categoryService.getInstance) {
        throw new Error("This object cannot be instanciated");
    }

}

categoryService.instance = null;
categoryService.getInstance = function () {
    if (this.instance === null) {
        this.instance = new categoryService();
    }
    return this.instance;
}

module.exports = categoryService.getInstance();
