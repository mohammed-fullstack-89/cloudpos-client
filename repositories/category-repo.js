var db = require('../models/index'), Seq = db.Seq();

class CategoriesService {
    async getCategories(parentId) {
        let categoryTable = db.model('category');
        let categories = [];
        categories = await categoryTable.findAll({
            where: {
                parent: parentId == undefined || parentId === 0 ? null : parentId
            }
        });
        categories = JSON.stringify(categories);
        return categories;
    }

    async setCategories(categoriesList, force) {
        let categoryTable = db.model("category");
        if (force) {
            await categoryTable.destroy({ truncate: true });
        }
        categoryTable.bulkCreate(JSON.parse(categoriesList), { updateOnDuplicate: [...Object.keys(categoryTable.rawAttributes)] });
    }
}

CategoriesService.instance = null;
CategoriesService.getInstance = function () {
    if (CategoriesService.instance === null) {
        CategoriesService.instance = new CategoriesService();
    }
    return CategoriesService.instance;
};

module.exports = CategoriesService.getInstance();
