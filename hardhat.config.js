/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: 'state hour chalk envelope naive obscure caught frog drink giraffe relief prosper',
      },
      chainId: 1337,
    },
  },
};
