import { useEffect, useState } from "react";

export default function Test(){

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {

        const getAccounts = async () => {
            const accounts = await window.web3.eth.getAccounts();
            setAccounts(accounts);
        }

        getAccounts();
    
    }, [])

    return(
        <>
            <div>This is a test.</div>
            <div>
                {accounts.map((account) => <><div>{account}</div><br /></>)}
            </div>
        </>
    )
}