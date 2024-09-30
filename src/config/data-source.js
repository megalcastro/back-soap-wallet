// data-source.js
const { DataSource } = require('typeorm');
const Client = require('../entities/Client'); // Ajusta la ruta según tu estructura de carpetas

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root1234',
    database: 'app_wallet',
    synchronize: true,
    entities: [Client],
});

module.exports = AppDataSource;
