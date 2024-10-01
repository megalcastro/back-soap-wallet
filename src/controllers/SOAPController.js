const soap = require('soap');
const path = require('path');
const fs = require('fs');

const ClienteService = require('../services/ClienteService');


const clienteService = new ClienteService();

const soapMethods = {
    WalletService: {
        WalletServicePort: {
            registroCliente: async function (args) {
                try {
                    const cliente = await clienteService.registroCliente(args);
                    return { success: true, cod_error: '00', message_error: '' };
                } catch (error) {
                    return {
                        success: false,
                        cod_error: '01',
                        message_error: error.message || 'Error al crear el cliente'
                    };
                }
            },            
            consultarSaldo: async function (args) {
                try {
                    const saldo = await clienteService.consultarSaldo(args.documento, args.celular);
                    return { success: true, cod_error: '00', message_error: '' ,saldo:saldo.saldo || 0};
                } catch (error) {
                    return {
                        success: false,
                        cod_error: '06',
                        message_error: error.message || 'Error al consultar saldo'
                    };
                }
            },
            recargarBilletera: async function (args) {
                console.log(args);
                try {
                    const result = await clienteService.recargarBilletera(args.documento, args.celular, args.valor);
                    return { success: true, cod_error: '00', message_error: '',result };
                } catch (error) {
                    return {
                        success: false,
                        cod_error: '03',
                        message_error: error.message || 'Error al recargar billetera'
                    };
                }
            },
            pagarCompra: async function (args) {
                try {
                    const result = await clienteService.pagarCompra(args.documento, args.celular, args.monto);
                    return { success: true, cod_error: '00', message_error: '',result };
                } catch (error) {
                    return {
                        success: false,
                        cod_error: '04',
                        message_error: error.message || 'Error al pagar compra'
                    };
                }
            },
            
            confirmarCompra: async function (args) {
                console.log(args);
                try {
                    const result = await clienteService.confirmarCompra(args.sessionId, args.token);
                    return { success: true, cod_error: '00', message_error: '',result };
                } catch (error) {
                    return {
                        success: false,
                        cod_error: '05',
                        message_error: error.message || 'Error al confirmar compra'
                    };
                }
            }
        }
    }
};

function startSoapServer(server) {
    const wsdlPath = path.resolve(__dirname, '../wsdl/service.wsdl');
    const wsdl = fs.readFileSync(wsdlPath, 'utf8');

    soap.listen(server, '/soap', soapMethods, wsdl, function() {
        console.log('SOAP server is running on http://localhost:3000/soap');
    });
}

module.exports = startSoapServer;
