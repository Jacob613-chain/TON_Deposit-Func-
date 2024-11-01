import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleDeposit = async () => {
        try {
            const response = await axios.post('/api/deposit', {
                amountTON: amount,
                userPrivateKey: 'user_private_key_here' 
            });
            setMessage('Deposit successful!');
        } catch (error) {
            setMessage('Deposit failed: ' + error.message);
        }
    };

    return (
        <div className="App">
            <h1>Deposit TON Coins</h1>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount of TON"
            />
            <button onClick={handleDeposit}>Deposit</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;