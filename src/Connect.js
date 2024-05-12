import { useEffect, useState } from "react";
import Web3 from 'web3';
import Test from './Test';

export default function Connect(){

    const [web3, setWeb3] = useState();

    const connectToLocalNetwork = async () => {
        const web3 = new Web3('http://localhost:8545');
        setWeb3(web3);
    };

    useEffect(() =>{
        connectToLocalNetwork();
    }, []);

    return(
        <Test web3={web3}/>
    )
}