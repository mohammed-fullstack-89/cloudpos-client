

var orm = require('./index')
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
        // get_ratio: { type: Seq.STRING, defualtValue: null, allowNull: true },


    },

    relations: [{
        type: 'belongsToMany',
        related_to: 'ratios',
        relationOptions: {
            as: 'get_ratio',
            through: 'companies_ratios',
            foreignKey: 'company_id',
            otherKey: 'ratio_id',
            onDelete: 'cascade'
            // constraints: false
        },
    },
    {
        type: 'belongsToMany',
        related_to: 'terms',
        relationOptions: {
            as: 'get_terms',
            through: 'companies_terms',
            foreignKey: 'company_id',
            otherKey: 'term_id',
            onDelete: 'cascade',
            onUpdate: 'cascade'
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

