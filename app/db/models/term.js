

var orm = require('./index')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_en: { type: Seq.STRING, defualtValue: true, allowNull: true },
        name_ar: { type: Seq.STRING, defualtValue: true, allowNull: true },

    },

    relations: [{
        type: 'belongsToMany',
        related_to: 'companies',
        relationOptions: {
            // as: 'get_term',
            through: 'companies_terms',
            foreignKey: 'term_id',
            otherKey: 'company_id',
        },
    }],
    columnsIndex: {
        indexes: [{
            name: 'terms_name_ar_foreign',
            fields: [`name_ar`]
        },
        {
            name: 'terms_name_en_foreign',
            fields: [`name_en`]
        },
        ]
    }
}

