var orm = require('./index')
    , Seq = orm.Seq();

module.exports = {
    model: {

        id: { type: Seq.BIGINT(20), primaryKey: true, autoIncrement: true },
        item_id: { type: Seq.BIGINT(20), defaultValue: null, allowNull: true },
        item_alternative_id: { type: Seq.BIGINT(20), defaultValue: null, allowNull: true },
    },
    relations: [{
        type: 'belongsToMany',
        related_to: 'items',
        relationOptions: {
            as: 'get_item_alternatives',
            through: 'item_alternatives',
            foreignKey: 'item_alternative_id',
            otherKey: 'item_id',
        }
    }],
}
