const express = require('express');
const TonWeb = require('tonweb');
const app = express();
app.use(express.json());

const providerApiKey = '65de628103379a8e639737b7024964f02e90151b74dcb2b9f793128b1699e5aa'; 
const tonweb = new TonWeb(new TonWeb.HttpProvider(providerApiKey));
const websiteWalletAddress = '';

async function transferTON(userPrivateKey, amountTON) {
    try {
        const userWallet = tonweb.wallet.create({ publicKey: userPrivateKey });
        const amountToSend = TonWeb.utils.toNano(amountTON);
        const transaction = await userWallet.methods.transfer({
            toAddress: websiteWalletAddress,
            amount: amountToSend,
            seqno: await userWallet.methods.seqno().call(),
            sendMode: 3,
        }).send();

        return transaction;
    } catch (error) {
        console.error('Error during transaction:', error);
        throw error;
    }
}

app.post('/api/deposit', async (req, res) => {
    const { userPrivateKey, amountTON } = req.body;

    try {
        const result = await transferTON(userPrivateKey, amountTON);
        res.status(200).json({ success: true, transaction: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
