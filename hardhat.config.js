/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-ganache");

const { RINKEBY_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "rinkeby",
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
    //   url: ROPSTEN_URL,
    //   accounts: [`0x${PRIVATE_KEY}`],
    // },
    rinkeby: {
      url: RINKEBY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
