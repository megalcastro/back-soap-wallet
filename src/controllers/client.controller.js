const { customerRegistration , rechargeWallet,checkBalance,confirmPurchase,paidPurchase } = require('../libs/clientLib');


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
        res.status(500).json({ success: false , cod_error:'03' , message_error });
    }
}

const  paidPurchaseClient = async (req, res)  => {

    const  {
        documento,
        monto,
        celular,
    } = req.body;


    const args = {
        documento,
        monto,
        celular
    };

    try {
        result = await paidPurchase(args);
   
        res.status(200).json({ success: true , cod_error:'00' , message_error:'',result});
    
    } catch (message_error) {
        res.status(500).json({ success: false , cod_error:'04' , message_error,result:'' });
    }
}

const  confirmPurchaseClient = async (req, res)  => {

    const  {
        sessionId,
        token,
    } = req.body;


    const args = {
        sessionId,
        token
    };

    try {
        const result = await confirmPurchase(args);
   
        res.status(200).json({ success: true , cod_error:'00' , message_error:'',result});
    
    } catch (message_error) {
        res.status(500).json({ success: false , cod_error:'05' , message_error ,result:''});
    }
}

const  checkBalanceClient = async (req, res)  => {

    const  {
        documento,
        celular,
    } = req.body;


    const args = {
        documento,
        celular,
    };

    try {
        const result = await checkBalance(args);
   
        res.status(200).json({ success: true , cod_error:'00' , message_error:'',result});
    
    } catch (message_error) {
        res.status(500).json({ success: false , cod_error:'06' , message_error ,result:''});
    }
}


module.exports = { createCustomer, rechargeWalletClient,paidPurchaseClient,confirmPurchaseClient,checkBalanceClient };