

var orm = require('./index')
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
            as: 'get_ratio',
            through: 'companies_ratios',
            foreignKey: 'ratio_id',
            otherKey: 'company_id',
            onDelete: 'cascade',
            onUpdate: 'cascade'
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

