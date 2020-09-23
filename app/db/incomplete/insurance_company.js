const { Model, DataTypes } = require("sequelize/types");

class InsuranceCompany extends Model { }

InsuranceCompany.init({
    id: { type: DataTypes.BIGINT(20), primaryKey: true, autoIncrement: true },
    name_ar: { type: DataTypes.STRING, allowNull: false, },
    name_en: { type: DataTypes.STRING, allowNull: true },
    mobile: { type: DataTypes.STRING, allowNull: true, defualtValue: null },
    phone: { type: DataTypes.STRING, allowNull: true, defualtValue: null },
    fax: { type: DataTypes.STRING, allowNull: true, defualtValue: null },
    email: { type: DATATYPES.STRING, allowNull: true, defualtValue: null },
}, { sequelize: db, modelName: 'companies', charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' })
module.exports = InsuranceCompany;