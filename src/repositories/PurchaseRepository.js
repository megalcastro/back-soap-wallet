
const Purchase = require('../entities/Purchase'); 

class PurchaseRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(Purchase);
    }

    async createPurchase(data) {
        const purchase = this.repository.create(data);
        await this.repository.save(purchase);
        return purchase;
    }


    async updatePurchase(data) {
        return await this.repository.save(data);
    }

    async findOnePurchase (data){
        const { sessionId , clientId } = data;
        return await this.repository.findOne({ where: { sessionId, clientId } });
    }
}

module.exports = PurchaseRepository;
