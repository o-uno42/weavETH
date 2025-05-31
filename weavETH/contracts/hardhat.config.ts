require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    mainnet: {
      url: process.env.MAINNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    holesky: {
      url: process.env.HOLESKY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  
};
