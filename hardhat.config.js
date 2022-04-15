/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-ganache");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "ganache",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      // accounts: [privateKey1, privateKey2, ...]
    },
    hardhat: {
      // url: "http://localhost:8545",
      chainId: 1337,
    },
    // ropsten: {
    //   url: API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // },
  },
};
