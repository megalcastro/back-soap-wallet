// ClienteService.js
const AppDataSource = require('../config/data-source');
const PurchaseRepository = require('../repositories/PurchaseRepository');

class PurchaseService {
    constructor() {
        this.purchaseRepository = new PurchaseRepository(AppDataSource);
    }

    
    
}

module.exports = PurchaseService;
