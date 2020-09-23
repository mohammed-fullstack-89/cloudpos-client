

var db = require('../db.manager');
var categoryService = function categoryService() {


    this.getCategories = async function () {
        var categoryTable = db.model('categories');
        var categories = [];
        categories = await categoryTable.findAll();
        categories = JSON.stringify(categories);
        console.log("categories : " + categories);
        return categories;
    }

    this.setCategories = async function (categoriesList) {
        console.log(categoriesList);
        var categoryTable = db.model("categories");
        await categoryTable.bulkCreate(JSON.parse(categoriesList), { returning: true });
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
