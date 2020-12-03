'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CustomerEntity extends Model {

        static associate(models) {
            CustomerEntity.belongsTo(models.customer, { foreignKey: 'customer_id', targetKey: 'id' });
            CustomerEntity.belongsTo(models.entity, { foreignKey: 'entity_id', targetKey: 'id' });

        }
    };
    CustomerEntity.init({
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        customer_id: {
            type: DataTypes.BIGINT, allowNull: false, primaryKey: false,

            references: {
                model: 'customer',
                key: 'id'
            },

            unique: 'unique-genre-per-customer'
        },
        entity_id: {
            type: DataTypes.BIGINT, allowNull: false, references: {
                model: 'entity',
                key: 'id'
            },
            unique: 'unique-genre-per-entity'
        },
    }, {
        sequelize,
        modelName: 'customer_entities',
    });
    return CustomerEntity;
};