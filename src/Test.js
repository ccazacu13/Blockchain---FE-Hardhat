import { useEffect, useState } from "react";
import MunicipalVotingSystem from './contract/MunicipalVotingSystem.json';

export default function Deploy({web3}){

    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState();

    const deployContract = async () => {

        const getAccounts = async () => {

            const accounts = await web3.eth.getAccounts();
            setAccounts(accounts);
        }  

    await getAccounts();

        const contractABI = MunicipalVotingSystem.abi;
        const contractBytecode = MunicipalVotingSystem.bytecode;

        const contract = new web3.eth.Contract(contractABI);

        const deployedContract = await contract.deploy({
            data: contractBytecode,
            arguments: [],
        }).send({
            from: accounts[0],
            gas: 2000000,
            gasPrice: '30000000000',
        });

        console.log('Contract deployed at address:', deployedContract.options.address);

        setContract(deployContract);
        }

    useEffect(() => {

        console.log("this was called");

        deployContract();

        if(contract)
            console.log("MyContract deployed to address:", contract.address)
    
    }, [])

    return(
        <>
            <div>This is a test.</div>
            <div>
                {accounts ? accounts.map((account, key) => <><div>{key}.{account}</div><br /></>) : <div>Yet to load</div>}
            </div>
        </>
    )
}