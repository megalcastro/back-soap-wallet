const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Purchase',
    tableName: 'purchases',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        clientId: {
            type: 'int',
            nullable: false,
        },
        amount: {
            type: 'decimal',
            nullable: false,
        },
        sessionId: {
            type: 'varchar',
            nullable: true,
        },
        createdAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
        updatedAt: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
    relations: {
        client: {
            target: 'Client',
            type: 'many-to-one',
            joinColumn: { name: 'clientId' },
            inverseSide: 'purchases',
        },
    },
});
