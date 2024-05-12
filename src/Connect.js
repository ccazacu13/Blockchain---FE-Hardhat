import { useEffect } from "react";
import Web3 from 'web3';
import Test from './Test';

export default function Connect(){

    const connectToMetaMask = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            console.error("MetaMask not detected");
        }
    };

    useEffect(() =>{
        connectToMetaMask();
    }, []);

    return(
        <Test />
    )
}