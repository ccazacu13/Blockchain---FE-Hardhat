
async function main() {

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const VotingSystem = await ethers.getContractFactory("VotingSystem");
    const votingsystem = await VotingSystem.deploy();
  
    console.log("VotingSystem deployed to:", votingsystem.address);

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });