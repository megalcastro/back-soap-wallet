
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
        return await this.repository.save(purchase);
    }

    async findOnePurchase (data){
        return await this.repository.findOne(data);
    }
}

module.exports = PurchaseRepository;
