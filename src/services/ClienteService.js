// ClienteService.js
const AppDataSource = require('../config/data-source');
const ClienteRepository = require('../repositories/ClienteRepository');

class ClienteService {
    constructor() {
        this.clienteRepository = new ClienteRepository(AppDataSource);
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
            console.error('Error al registrar cliente:', error);
            throw new Error('Error al registrar cliente');
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
            console.error('Error al consultar saldo:', error);
            throw new Error('Error al consultar saldo');
        }
    }

    async recargarBilletera(documento, celular, valor) {
        const cliente = await this.clienteRepository.findByDocumentAndPhone(documento, celular);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
    
        const saldoActual = Number(cliente.saldo); 
        const valorRecarga = Number(valor); 
    
        cliente.saldo = saldoActual + valorRecarga;
    
        await this.clienteRepository.updateClienteSaldo(cliente);
    
        return { mensaje: 'Recarga exitosa', saldo: cliente.saldo };
    }
    
    
}

module.exports = ClienteService;
