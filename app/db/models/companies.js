

var orm = require('../db.manager')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        name_ar: { type: Seq.STRING, defualtValue: null, allowNull: true },
        name_en: { type: Seq.STRING, defualtValue: null, allowNull: true },
        mobile: { type: Seq.STRING, defualtValue: null, allowNull: true },
        phone: { type: Seq.STRING, defualtValue: null, allowNull: true },
        fax: { type: Seq.STRING, defualtValue: null, allowNull: true },
        email: { type: Seq.STRING, defualtValue: null, allowNull: true },
        get_ratio: { type: Seq.STRING, defualtValue: null, allowNull: true },


    },

    relations: [{
        type: 'belongsToMany',
        related_to: 'ratio',
        relationOptions: {
            as: 'get_ratio',
            through: 'companies_ratio',
            foreignKey: 'company_id',
            otherKey: 'ratio_id',
        },
    },
    {
        type: 'belongsToMany',
        related_to: 'companies',
        relationOptions: {
            // as: 'get_term',
            through: 'companies_terms',
            foreignKey: 'company_id',
            otherKey: 'term_id',
        }
    }],
    columnsIndex: {
        indexes: [{
            name: 'companies_name_ar_foreign',
            fields: [`name_ar`]
        },
        {
            name: 'companies_name_en_foreign',
            fields: [`name_en`]
        }]
    }
}

