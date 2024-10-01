const soap = require('soap');
const url = 'http://localhost:3000/soap?wsdl'; 

const customerRegistration = (args) => {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (err) {
                return reject(err);
            }

            client.registroCliente(args, (err, result) => {
                if (err) {
                    return reject(err);
                }

                if(result.success == 'false') {
                    reject(result);
                }   
                
                resolve(result);
            });
        });
    });
}

const rechargeWallet = (args) => {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (err) {
                return reject(err);
            }

            client.recargarBilletera(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                
                if(result.success == 'false') {
                    reject(result);
                }   
                
                resolve(result);
            });
        });
    });
}

const paidPurchase = (args) => {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (err) {
                return reject(err);
            }

            client.pagarCompra(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                
                if(result.success == 'false') {
                    reject(result);
                }   
                
                resolve(result);
            });
        });
    });
}

const confirmPurchase = (args) => {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (err) {
                return reject(err);
            }

            client.confirmarCompra(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                
                if(result.success == 'false') {
                    reject(result);
                }   
                
                resolve(result);
            });
        });
    });
}

const checkBalance = (args) => {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if (err) {
                return reject(err);
            }

            client.consultarSaldo(args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                
                if(result.success == 'false') {
                    reject(result);
                }   
                
                resolve(result);
            });
        });
    });
}

module.exports = { customerRegistration, rechargeWallet,paidPurchase,confirmPurchase,checkBalance };
