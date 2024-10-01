const routes = require('express').Router();
const {
    createCustomer,
    rechargeWalletClient,
    paidPurchaseClient,
    confirmPurchaseClient,
    checkBalanceClient

    } = require('../controllers/client.controller');


routes.post('/registroCliente',createCustomer);
routes.post('/recargarBilletera',rechargeWalletClient);
routes.post('/pagarCompra',paidPurchaseClient);
routes.post('/confirmarCompra',confirmPurchaseClient);
routes.post('/consultarSaldo',checkBalanceClient);

module.exports = routes;