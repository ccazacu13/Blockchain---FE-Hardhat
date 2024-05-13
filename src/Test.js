import { useEffect, useState } from "react";
import MunicipalVotingSystem from './contract/MunicipalVotingSystem.json';

export default function Deploy({web3}){

    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);

    const deployContract = async () => {

        if(contract != null)
            return;

        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        const contractABI = MunicipalVotingSystem.abi;
        const contractBytecode = MunicipalVotingSystem.bytecode;

        const undContract = new web3.eth.Contract(contractABI);

        const deployedContract = await undContract.deploy({
            data: contractBytecode,
            arguments: [],
        }).send({
            from: accounts[0],
            gas: 2000000,
            gasPrice: '30000000000',
        });
    
        if(!contract)
        {
            setContract(deployedContract);
            console.log('got here once;');
        }

    }

    useState(() => {
        deployContract();
    }, [])

    return(
        <>
            <div>This is a test.</div>
            <button onClick={deployContract}>Deploy</button>
            <div>
                {accounts ? accounts.map((account, key) => <><div>{key}.{account}</div><br /></>) : <div>Yet to load</div>}
            </div>
        </>
    )
}