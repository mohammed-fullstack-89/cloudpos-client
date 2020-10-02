var registerPromiseWorker = require('promise-worker/register');

registerPromiseWorker((message) => {
    if (message.type === 'setCategories') {
        let categoryService = require('../db/services/category.service');
        return await categoryService.setCategories(message.args[0])


    }

    if (message.type === 'getCategories') {
        let categoryService = require('../db/services/category.service');
        let categories = await categoryService.getCategories(message.args[0]);
        return categories;
    }
});