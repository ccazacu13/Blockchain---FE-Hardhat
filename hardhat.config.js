/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: 'rural coyote again mosquito oblige unit oven usage saddle trap picture inch',
      },
      chainId: 1337,
    },
  },
};
