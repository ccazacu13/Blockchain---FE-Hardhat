
// npx hardhat run scripts/deploy.js --network localhost
// Contract Deploy

import { useEffect, useState } from 'react';
import VotingSystem from '../Contracts/VotingSystem.json';
import DisplayProjects from './DisplayProjects';

export default function Connect(){

    const [providerDTO, setProviderDTO] = useState(null);

    const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
    const ethers = require("ethers");

    const providerMetamask = async () => {

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        // const signer = await provider.getSigner();
        // const contract = new ethers.Contract(contractAddress, VotingSystem.abi, signer);

        const providerDTO = {
            contractAddress,
            VotingSystem
        }

        setProviderDTO(providerDTO);
    }

    useEffect(() => {
        providerMetamask();
    }, [])

    return(
        <div>
            {/* Connect Component */}
            {providerDTO ? <DisplayProjects providerDTO={providerDTO} /> : "Loading.."}
        </div>
    )
}