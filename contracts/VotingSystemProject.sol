// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract MunicipalVotingSystem{

    //Variables
    struct Option{
        string name;
        string description;
        uint256 cost;
        mapping(string => bool) voted;
        uint256 voteCount;
        uint256 donation;
    }

    struct OptionDto{
        string name;
        string description;
        uint256 cost;
        uint256 voteCount;
        uint256 donation;
    }
        
    struct Project{
        string name;
        mapping (uint => Option) options;
        uint optionSize;
        uint256 availableFunds;
        uint256 choiceDeadline;
    }

    struct Voter{
        address voterAddress;
    } 

    address public voteAdministrator;

    mapping (string => Voter) public voters;

    Option[] public foundedOptions;

    Project[] public projects;

    constructor(){
        voteAdministrator = msg.sender;
    }

    //Modifiers

    modifier OnlyOwner(){
        require(msg.sender == voteAdministrator, "Only the owner can create new projects!");
        _;
    }

    modifier CNPOwner(string memory cnp){
        Voter memory currentVoter = voters[cnp];
        require(currentVoter.voterAddress == msg.sender, "This is not the address relative to this cnp");
        _;
    }

    modifier AlreadyVoted(uint256 projectId, uint256 optionId, string memory cnp){
        Option storage option = projects[projectId].options[optionId];
        require(option.voted[cnp] == false, "You already voted this option!");
        _;
    }

    //Service

    function GetTimestamp(uint256 currentTimestamp, uint256 daysDeadline) internal pure returns(uint256){
        return currentTimestamp + daysDeadline * 86400;
    }

    //Functions

    function SignUpVoter(string memory cnp) external{
        Voter memory voter = Voter(msg.sender);
        voters[cnp] = voter;
    }

    function CreateProject(string memory name, uint256 availableFunds, uint256 daysDeadline) OnlyOwner external{
        Project storage newProject = projects.push();
        newProject.name = name;
        newProject.availableFunds = availableFunds;
        newProject.optionSize = 0;
        newProject.choiceDeadline = GetTimestamp(block.timestamp, daysDeadline);
    }

    function CreateOption(uint32 projectId, string memory name, string memory description, uint256 estimatedCost) OnlyOwner external{

        uint256 currentIndex = projects[projectId].optionSize;
        Option storage option = projects[projectId].options[currentIndex];
        
        // We get the index/id for the new option and load It
        option.name = name;
        option.description = description;
        option.cost = estimatedCost;
        option.voteCount = 0;
        option.donation = 0;

        projects[projectId].optionSize += 1;
    }

    function ViewOption(uint256 projectId, uint256 optionId) external view returns(OptionDto memory){
        Option storage option = projects[projectId].options[optionId];
        return OptionDto(option.name, option.description, option.cost, option.voteCount, option.donation);
    }

    function Vote(uint256 projectId, uint256 optionId, string memory cnp) external
     CNPOwner(cnp) AlreadyVoted(projectId, optionId, cnp)
      {
        Option storage option = projects[projectId].options[optionId];
        option.voted[cnp] = true;
        option.voteCount += 1;
    }

    function GetResults() external view returns (uint256[] memory){
        uint256 numberProjects = projects.length;
        uint256 resultsLength = 0;
        uint256[] memory results = new uint256[](numberProjects);

        for(uint256 i=0; i<numberProjects; ++i){

            if(block.timestamp > projects[i].choiceDeadline)
            {
                uint numberOptions = projects[i].optionSize;
                uint256 maxIndex = 0;
                uint256 maxVotes = 0;

                for(uint256 j=0; j<numberOptions; ++j){
                    uint256 numberVotes = projects[i].options[j].voteCount;

                    if(numberVotes >= maxVotes){
                        maxIndex = j;
                        maxVotes = numberVotes;
                    } 
                }

                results[resultsLength] = maxIndex;
                resultsLength++;
            }
            else{
                results[resultsLength] = 10000;    // 1000 code for still pending
                resultsLength++;
            }

        }

        return results;
    }

    function DonateToOption(uint256 projectId, uint256 optionId) external payable{
        Option storage option = projects[projectId].options[optionId];
        option.donation += msg.value;
        if(option.donation >= option.cost)
        {
            Option storage newFoundedOption = foundedOptions.push();
            newFoundedOption = option;
        }
    }

}