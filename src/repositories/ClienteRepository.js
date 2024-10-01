const Cliente = require('../entities/Client'); 

class ClienteRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Cliente);
    }

    async createCliente(data) {
        try {
            const cliente = this.repository.create(data);
            await this.repository.save(cliente);
            return cliente;
        } catch (error) {
            throw new Error(`Error al registrar cliente: ${error.message}`);
        }
    }

    async findByDocumentAndPhone(documento, celular) {
        try {
            return await this.repository.findOne({ where: { documento, celular } });
        } catch (error) {
            throw new Error(`Error al buscar cliente: ${error.message}`);
        }
    }

    async updateCliente(cliente) {
        try {
            return await this.repository.save(cliente);
        } catch (error) {
            throw new Error(`Error al actualizar cliente: ${error.message}`);
        }
    }

    async findOne(data) {
        try {
            return await this.repository.findOne(data);
        } catch (error) {
            throw new Error(`Error al buscar un cliente: ${error.message}`);
        }
    }
}

module.exports = ClienteRepository;
