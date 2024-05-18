import React, { useEffect, useState } from "react";
import Web3 from 'web3';
import { Link } from 'react-router-dom';
import Test from './Test';
import './App.css';  // Asigurați-vă că importați CSS-ul corespunzător

export default function Connect() {
    const [web3, setWeb3] = useState();

    const connectToLocalNetwork = async () => {
        const web3 = new Web3('http://localhost:8545');
        setWeb3(web3);
    };

    useEffect(() => {
        connectToLocalNetwork();
    }, []);

    return (
        <div className="App-header">  
            {web3 ? <Test web3={web3} /> : <div>Loading...</div>}
            <div className="top-right-button">
                <Link to="/project"><button>Vizitează Proiectul</button></Link>
            </div>
        </div>
    );
}
