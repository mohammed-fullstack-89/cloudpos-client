const db = require('../models/index');

class UserService {

    async saveUsers(userArray) {
        try {
            if (userArray && userArray != []) {
                const userTable = db.model('user');
                await userTable.destroy({ truncate: false, where: {} });
                await userTable.bulkCreate(userArray);
            }
        } catch (error) {
            console.log("error : " + error);
        }
    }

    async getUserByCode(code) {
        const userTable = db.model('user');
        const result = await userTable.findOne({
            where: { code }
        });
        const user = JSON.stringify(result);
        return user;
    }
}

UserService.instance = null;
UserService.getInstance = function () {
    if (UserService.instance == null) {
        UserService.instance = new UserService();
    }
    return UserService.instance;
};

module.exports = UserService.getInstance();
