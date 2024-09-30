// ClienteRepository.js
const Cliente = require('../entities/Client'); // Asegúrate de que la entidad Cliente esté definida

class ClienteRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Cliente);
    }

    async createCliente(data) {
        const cliente = this.repository.create(data); // Crea una nueva instancia del cliente
        await this.repository.save(cliente); // Guarda el cliente en la base de datos
        return cliente; // Retorna el cliente creado
    }

    async findByDocumentAndPhone(documento, celular) {
        return await this.repository.findOne({ where: { documento, celular } });
    }
}

module.exports = ClienteRepository;
