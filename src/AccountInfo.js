// AccountInfo.js
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

function AccountInfo() {
    const [accounts, setAccounts] = useState([]);
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const loadAccountData = async () => {
            const accs = await web3.eth.getAccounts();
            setAccounts(accs);
            const bal = await Promise.all(accs.map(account => web3.eth.getBalance(account)));
            setBalances(bal.map(balance => web3.utils.fromWei(balance, 'ether'))); // Adăugați 'ether' ca unitate
        };
        loadAccountData();
    }, []);

    return (
        <div>
            <h1>Conturi Blockchain</h1>
            <ul>
                {accounts.map((account, index) => (
                    <li key={account}>
                        Adresa: {account} - Balanța: {balances[index]} ETH
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountInfo;
