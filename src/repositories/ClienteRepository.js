
const Cliente = require('../entities/Client'); 

class ClienteRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Cliente);
    }

    async createCliente(data) {
        const cliente = this.repository.create(data);
        await this.repository.save(cliente);
        return cliente;
    }

    async findByDocumentAndPhone(documento, celular) {
        return await this.repository.findOne({ where: { documento:documento, celular:celular } });
    }

    async updateCliente(cliente) {
        return await this.repository.save(cliente);
    }

    async findOne (data){
        return await this.repository.findOne(data);
    }
}

module.exports = ClienteRepository;
