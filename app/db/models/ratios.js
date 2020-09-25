

var orm = require('../db.manager')
    , Seq = orm.Seq();

module.exports = {
    model: {
        id: { type: Seq.BIGINT, primaryKey: true, autoIncrement: true },
        value: { type: Seq.DOUBLE, defualtValue: 0, allowNull: false },

    },

    relations: [{
        type: 'belongsToMany',
        related_to: 'companies',
        relationOptions: {
            as: 'get_ratios',
            through: 'companies_ratios',
            foreignKey: 'ratio_id',
            otherKey: 'company_id',
        },
    }],
    columnsIndex: {
        indexes: [{
            name: 'ratios_value_foreign',
            fields: [`value`]
        },
        ]
    }
}

