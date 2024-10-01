const soap = require('soap');
const url = 'http://localhost:3000/soap?wsdl'; 


const customerRegistration = (args) => {
    soap.createClient(url, (err, client) => {
        if (err) throw err;
        
        client.registroCliente(args, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    });

}



module.exports = { customerRegistration };