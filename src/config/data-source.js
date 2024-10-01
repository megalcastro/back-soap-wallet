// data-source.js
const { DataSource } = require('typeorm');
const CONFIG_DB = require('./db.config');
const Client = require('../entities/Client');
const Purchase = require('../entities/Purchase');

const AppDataSource = new DataSource({
    ...CONFIG_DB,
    entities: [Client,Purchase],
});

module.exports = AppDataSource;
