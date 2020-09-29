
// const remote = require('electron').remote;

// const db = remote.getGlobal('db');
var db = require('../db.manager')
    , Seq = db.Seq();
var categoryService = function categoryService() {


    this.getCategories = async function (parentId) {

        var categoryTable = db.model('categories');
        var categories = [];
        categories = await categoryTable.findAll({
            where: {
                parent: parentId
            }
        });
        categories = JSON.stringify(categories);
        console.log("categories : " + categories);
        return categories;
    }

    this.setCategories = async function (categoriesList) {
        var categoryTable = db.model("categories");
        await categoryTable.bulkCreate(JSON.parse(categoriesList), { returning: true });
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
