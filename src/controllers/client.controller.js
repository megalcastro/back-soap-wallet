const { customerRegistration , rechargeWallet } = require('../libs/clientLib');


const  createCustomer = async (req, res)  => {

    const  {
        documento,
        nombres,
        email,
        celular,
    } = req.body;


    const args = {
        documento,
        nombres,
        email,
        celular
    };

    try {
        await customerRegistration(args);
   
        res.status(200).json({ success: true , cod_error:'00' , message_error:''});
    
        
    } catch (message_error) {
        res.status(500).json({ success: false , cod_error:'01' , message_error });
    }
}


const  rechargeWalletClient = async (req, res)  => {

    const  {
        documento,
        valor,
        celular,
    } = req.body;


    const args = {
        documento,
        valor,
        celular
    };

    try {
        await rechargeWallet(args);
   
        res.status(200).json({ success: true , cod_error:'00' , message_error:''});
    
    } catch (message_error) {
        res.status(500).json({ success: false , cod_error:'02' , message_error });
    }
}


module.exports = { createCustomer, rechargeWalletClient };