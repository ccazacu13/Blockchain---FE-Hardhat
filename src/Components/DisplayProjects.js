import { useEffect, useState } from "react"
import './DisplayProjects.css';

export default function DisplayProjects({providerDTO}){

    const [projects, setProjects] = useState(null);
    const [options, setOptions] = useState(null);
    const [results, setResults] = useState(null);

    const [projectName, setProjectName] = useState("");
    const [availableFunds, setAvailableFunds] = useState(0);
    const [daysDeadline, setDaysDeadline] = useState(0);

    const [cnp, setCnp] = useState('');

    const [optionName, setOptionName] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedCost, setEstimatedCost] = useState(0);
    const [currentProject, setCurrentProject] = useState(-1);
    const [currentOption, setCurrentOption] = useState(-1);

    const ethers = require('ethers');

    const createProject = async () => {
        try{
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(providerDTO.contractAddress, providerDTO.VotingSystem.abi, signer);
            const transaction = await contract.CreateProject(projectName, availableFunds, daysDeadline);
            console.log("Project created successfully!", {transaction});
        }catch(err){
            console.log("Error", err);
        }
    }

    const getAllProjects = async () => {
        try{
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(providerDTO.contractAddress, providerDTO.VotingSystem.abi, signer);
            const transaction = await contract.GetAllProjects();
            console.log("Projects received successfully!", {transaction});

            setProjects(transaction);
        }catch(err){
            console.log("Error", err);
        }
    }

    const signUpVoter = async() => {
        try{
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(providerDTO.contractAddress, providerDTO.VotingSystem.abi, signer);
            const transaction = await contract.SignUpVoter(cnp);
            console.log("Sign up succesfully!", {transaction});

        }catch(err){
            console.log("Error", err);
        }

    }

    const createOption = async() => {
        try{
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(providerDTO.contractAddress, providerDTO.VotingSystem.abi, signer);
            const transaction = await contract.CreateOption(parseInt(currentProject, 10), optionName, description, estimatedCost);
            console.log("Option created successfully!", {transaction});

        }catch(err){
            console.log("Error", err);
        }
    }

    const displayOptions = async () => {
        try{
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(providerDTO.contractAddress, providerDTO.VotingSystem.abi, signer);
            const transaction = await contract.GetAllOptionsForProject(currentProject);
            console.log("Options received successfully!", {transaction});

            setOptions([transaction, currentProject]);
        }catch(err){
            console.log("Error", err);
        }
    }

    const handleVote = async () => {
        try{
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(providerDTO.contractAddress, providerDTO.VotingSystem.abi, signer);
            const transaction = await contract.Vote(currentProject, currentOption, cnp);
            console.log("Vote was succesfull!", {transaction});

            setOptions([transaction, currentProject]);
        }catch(err){
            console.log("Error", err);
        }
    }

    const showResults = async () => {
        try{
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(providerDTO.contractAddress, providerDTO.VotingSystem.abi, signer);
            const transaction = await contract.GetResults();
            console.log("Results received successfully!", {transaction});

            setResults(transaction);
        }catch(err){
            console.log("Error", err);
        }
    }

    return(
        <div>
            <div className="form projectAdd">
                <label>Project Name: </label>
                <input placeholder="Project Name.." 
                       onChange={(event) => {setProjectName(event.target.value)}
                }></input><br />
                <label>Available Funds: </label>
                <input type="number"
                       onChange={(event) => {setAvailableFunds(event.target.value)}}
                ></input><br />
                <label>Days to deadline: </label>
                <input type="number"
                       onChange={(event) => {setDaysDeadline(event.target.value)}}
                ></input><br />
                <button onClick={createProject}>Create Project</button>
            </div>
            <div className="form">
                Sign up as voter<br />
                <input placeholder="cnp.."
                       onChange={(event) => {setCnp(event.target.value)}}></input><br/>
                <button onClick={signUpVoter}>Sign Up</button>
            </div>
            <div>
                <button onClick={getAllProjects}>Get Projects</button>
                <div>
                    {projects ? 
                    projects.map((project, key) => 
                    <div className="projectCard">
                        <p>{key + 1}.Project name: {project[0]}</p>
                        <p>Available funds: {String(project[2])}</p>
                        <p>Days left: {Math.ceil(parseFloat(project[3]) / 86400 - 19873)}</p>
                        <div className="optionForm">
                            <label>Option name: </label>
                            <input
                                onChange={(event) => {setOptionName(event.target.value)}}
                            ></input><br />
                            <label>Description: </label>
                            <input
                                onChange={(event) => {setDescription(event.target.value)}}
                            ></input><br />
                            <label>Estimated cost: </label>
                            <input type="number"
                                onChange={(event) => {setEstimatedCost(event.target.value)}}></input><br />
                            <button onClick={() => {setCurrentProject(key); createOption();}}>Create Option</button>
                        </div>
                        <button className="displayOptionsButton" onClick={() => {setCurrentProject(key); displayOptions();}}>Display Options</button>
                        <div>
                            {options && options[1] == key ?
                                options[0].map((option, opKey) =>
                                <div className="optionCard">
                                    <p>Name: {option[0]}</p>
                                    <p>Description: {option[1]}</p>
                                    <p>Cost: {String(option[2])}</p>
                                    <p>Votes: {String(option[3])}</p>
                                    <p>Donations: {String(option[4])}</p>
                                    <button className="VoteButton" onClick={() => {
                                        setCurrentProject(key);
                                        setCurrentOption(opKey);
                                        handleVote();
                                        }}>Vote</button> 
                                </div>) :
                                <div></div>}
                        </div>
                    </div>) 
                    : "No projects available.."}
                </div>
            </div>
            <div className="resultsList">
                <button onClick={showResults}>Show results</button>
                <div>
                    {results ? 
                    <ul>
                        {results.map((result, key) => <li><strong>Proiect {key}: Optiunea {result != 10000 ? String(result) : "nu a fost decisa."}</strong></li>)}
                    </ul> :
                    <></>}
                </div>
            </div>
        </div>
    )
}