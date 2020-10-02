
// var orm = require('../../../models/index')
//     , Seq = orm.Seq();

// module.exports =
//     Seq.define('instrument', {
//         id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
//         address: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         governorate: { type: Seq.STRING, defaultValue: null, allowNull: true },
//         zone: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         email: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         street: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         building: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         floor: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         office_flat_number: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         longitude: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         latitude: { type: Seq.STRING, defualtValue: null, allowNull: true },
//         customer_id: { type: Seq.BIGINT, defualtValue: null, allowNull: true, },
//     }),
//     relations: [{
//         type: "belongsTo",
//         related_to: "customers",
//         relationOptions: {
//             foreignKey: {
//                 field: 'customer_id',
//                 name: 'customerId',

//             }
//         }
//     }],
//         columnsIndex: {
//     indexes: [{
//         name: 'customer_addresses_customer_id_foreign',
//         fields: [`customer_id`]
//     },
//     {
//         name: 'customer_addresses_address_foreign',
//         fields: [`address`]
//     },
//     {
//         name: 'customer_addresses_street_foreign',
//         fields: [`street`]
//     },
//     ]
// },

// }

