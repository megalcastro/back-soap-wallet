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

module.exports = { customerRegistration };
