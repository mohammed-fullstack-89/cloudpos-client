"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
        }
    }

    User.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        code: { type: DataTypes.STRING, defualtValue: null, allowNull: true },
        user_type_approvals: { type: DataTypes.STRING, defualtValue: null, allowNull: true }
    }, {
        sequelize,
        modelName: 'user',
        indexes: [{
            name: 'user_name_foreign',
            fields: ['name']
        }, {
            name: 'user_code_foreign',
            fields: ['code']
        }, {
            name: 'user_type_approvals_foreign',
            fields: ['user_type_approvals']
        }]
    });
    return User;
};