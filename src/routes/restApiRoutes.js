const routes = require('express').Router();
const { createCustomer,rechargeWalletClient } = require('../controllers/client.controller');


routes.post('/registroCliente',createCustomer);

routes.post('/recargarBilletera',rechargeWalletClient);

module.exports = routes;