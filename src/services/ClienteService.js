// ClienteService.js
const AppDataSource = require('../config/data-source');
const ClienteRepository = require('../repositories/ClienteRepository');
const PurchaseRepository = require('../repositories/PurchaseRepository');
const nodemailer = require('nodemailer');
const { generarSessionId, generarToken } = require('../utils/utils');

class ClienteService {
    constructor() {
        this.clienteRepository = new ClienteRepository(AppDataSource);
        this.purchaseRepository = new PurchaseRepository(AppDataSource);
    }

    async registroCliente(data) {
        const { documento, nombres, email, celular } = data;
        if (!documento || !nombres || !email || !celular) {
            throw new Error('Todos los campos son requeridos');
        }
    
        try {
            const cliente = await this.clienteRepository.createCliente(data);
            return cliente;
        } catch (error) {
            throw new Error(`Error al registrar cliente: ${error.message}`);
        }
    }    

    async consultarSaldo(documento, celular) {
        if (!documento || !celular) {
            throw new Error('Documento y celular son requeridos');
        }

        try {
            const cliente = await this.clienteRepository.findByDocumentAndPhone(documento, celular);
            return cliente;
        } catch (error) {
            throw new Error(`Error al consultar saldo ${error.message}`);
        }
    }

    async recargarBilletera(documento, celular, valor) {
        const cliente = await this.clienteRepository.findByDocumentAndPhone(documento, celular);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
    
        try {
        const saldoActual = Number(cliente.saldo); 
        const valorRecarga = Number(valor); 
    
        cliente.saldo = saldoActual + valorRecarga;
    
        await this.clienteRepository.updateCliente(cliente);
    
        return { mensaje: 'Recarga exitosa', saldo: cliente.saldo };
            
        } catch (error) {
            throw new Error(`Error al recargar billetera ${error.message}`);
        }
    }
    
    async pagarCompra(documento, celular, monto) {
        const cliente = await this.clienteRepository.findByDocumentAndPhone(documento, celular);
        const purchase = this.purchaseRepository;
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }

        if (cliente.saldo < monto) {
            throw new Error('Saldo insuficiente');
        }

        try {

        const token = generarToken();
        const sessionId = generarSessionId();

        cliente.token = token;
        cliente.sessionId = sessionId;
        await purchase.createPurchase({sessionId, amount:monto ,clientId:cliente.id});
        await this.clienteRepository.updateCliente(cliente);

        await this.enviarCorreoToken(cliente.email, token);

        return { mensaje: 'Correo enviado con el token de confirmación', sessionId };
            
        } catch (error) {
            throw new Error(`Error al pagar compra ${error.message}`);
        }
    }

    async enviarCorreoToken(email, token) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Token de confirmación para el pago',
            text: `Tu token de confirmación es: ${token}`,
        };

        await transporter.sendMail(mailOptions);
    }

    async confirmarCompra(sessionId, token) {

        const cliente = await this.clienteRepository.findOne({ where: { sessionId, token } });
        const purchase = await this.purchaseRepository.findOnePurchase({ sessionId , clientId:cliente.id });
        console.log('compra');
        if (!cliente) {
            throw new Error('Token o sesión inválidos');
        }

        try {
        const discount = purchase.amount;

        cliente.saldo -= discount;
        cliente.token = null;
        cliente.sessionId = null;
        await this.clienteRepository.updateCliente(cliente);

        return { mensaje: 'Compra confirmada y saldo descontado' };
            
        } catch (error) {
            throw new Error(`Error al confirmar compra ${error.message}`);
        }
        
    }
    
}

module.exports = ClienteService;
