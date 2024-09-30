const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Client',
    tableName: 'clients',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        documento: {
            type: 'varchar',
            unique: true,
        },
        nombres: {
            type: 'varchar',
        },
        email: {
            type: 'varchar',
            unique: true,
        },
        celular: {
            type: 'varchar',
        },
        saldo: {
            type: 'decimal',
            default: 0,
        },
        sessionId: {
            type: 'varchar',
            nullable: true,
        },
        token: {
            type: 'varchar',
            nullable: true,
        },
    },
});
