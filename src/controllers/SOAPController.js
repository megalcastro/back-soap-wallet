const soap = require('soap');
const path = require('path');
const fs = require('fs');

const ClienteService = require('../services/ClienteService');


const clienteService = new ClienteService();

const soapMethods = {
    WalletService: {
        WalletServicePort: {
            registroCliente: async function (args) {
                console.log('->',args);
                try {
                    const cliente = await clienteService.registroCliente(args);
                    return { mensaje: 'Cliente registrado', id: cliente.id };
                } catch (error) {
                    return { mensaje: 'Error al registrar cliente', error };
                }
            },
            consultarSaldo: async function (args) {
                try {
                    const cliente = await clienteService.consultarSaldo(args.documento, args.celular);
                    return { saldo: cliente ? cliente.saldo : 0 };
                } catch (error) {
                    return { mensaje: 'Error al consultar saldo', error };
                }
            },
            recargarBilletera: async function (args) {
                console.log(args);
                try {
                    const resultado = await clienteService.recargarBilletera(args.documento, args.celular, args.valor);
                    return resultado;
                } catch (error) {
                    return { mensaje: 'Error al recargar billetera', error: error.message };
                }
            },
            pagarCompra: async function (args) {
                try {
                    const resultado = await clienteService.pagarCompra(args.documento, args.celular, args.monto);
                    return resultado;
                } catch (error) {
                    return { mensaje: 'Error al procesar el pago', error: error.message };
                }
            },
            
            confirmarCompra: async function (args) {
                console.log(args);
                try {
                    const resultado = await clienteService.confirmarCompra(args.sessionId, args.token);
                    return resultado;
                } catch (error) {
                    return { mensaje: 'Error al confirmar la compra', error: error.message };
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
