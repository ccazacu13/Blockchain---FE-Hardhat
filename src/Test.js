import { useEffect, useState } from "react";

export default function Test({web3}){

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {

        const getAccounts = async () => {
            const accounts = await web3.eth.getAccounts();
            setAccounts(accounts);
        }

        getAccounts();
    
    }, [web3])

    return(
        <>
            <div>This is a test.</div>
            <div>
                {accounts ? accounts.map((account) => <><div>{account}</div><br /></>) : <div>Yet to load</div>}
            </div>
        </>
    )
}