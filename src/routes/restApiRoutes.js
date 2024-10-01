const routes = require('express').Router();
const { createCustomer } = require('../controllers/client.controller');


routes.post('/registroCliente',createCustomer);


module.exports = routes;