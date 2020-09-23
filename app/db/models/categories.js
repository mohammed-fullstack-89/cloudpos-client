var orm = require("../db.manager")
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
        name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },
        description: { type: Seq.STRING, defaultValue: null, allowNull: true },
        image: { type: Seq.STRING, allowNull: true },
        discount_type: { type: Seq.ENUM('percentage', 'value', 'undefined'), allowNull: false },
        discount_value: { type: Seq.DOUBLE, defualtValue: null, allowNull: true },
        branch_id: { type: Seq.BIGINT, allowNull: false },
        tax_id: { type: Seq.BIGINT, defualtValue: null, allowNull: true },
        printer_id: { type: Seq.BIGINT, defualtValue: null, allowNull: true },
        parent: { type: Seq.BIGINT, defualtValue: null, allowNull: true },
    },
    relations: [{
        type: "belongsTo",
        related_to: "categories",
        relationOptions: {
            foreignKey: 'parent'
        }

    }],
    columnsIndex: {
        indexes: [{
            name: 'categories_branch_id_foreign',
            fields: [`branch_id`]
        }, {
            name: 'categories_tax_id_foreign',
            fields: [`tax_id`]
        }, {
            name: 'categories_printer_id_foreign',
            fields: [`printer_id`]
        }, {
            name: 'categories_parent_foreign',
            fields: [`parent`]
        }]
    },
    // options: {
    //     freezeTableName: true,
    //     // define the table's name
    //     tableName: 'category'
    // }
}


// {
//     sequelize: db, modelName: 'category', indexes: [{
//         name: 'categories_branch_id_foreign',
//         fields: [`branch_id`]
//     }, {
//         name: 'categories_tax_id_foreign',
//         fields: [`tax_id`]
//     }, {
//         name: 'categories_printer_id_foreign',
//         fields: [`printer_id`]
//     }, {
//         name: 'categories_parent_foreign',
//         fields: [`parent`]
//     }], charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci'
// })

// Category.(Category, {
//     foreignKey: {
//         parent: {
//             type: Sequelize.BIGINT,
//             key: 'id',
//         }
//     }
// })
// module.exports = Category;