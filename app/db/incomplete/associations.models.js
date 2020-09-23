
const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require("../../db.manager");

// const BusinessType = require('./business_type');
// const Branche = require("./branche");

// BusinessType.hasMany(Branche)
// Branche.belongsTo(
//     BusinessType, {
//     as: 'business_type',
//     foreignKey: {
//         business_type_id: {
//             type: Sequelize.BIGINT, references: {
//                 model: BusinessType,
//                 key: 'id',
//             }
//         },
//     },

// })
// Branche.findAll().then((data) => console.log(data));

