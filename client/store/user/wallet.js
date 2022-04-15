import { ethers } from "ethers";

// state
export const state = () => ({
  connected: false,
  address: "",
  balance: 0,
  network: "",
  userGroups: [],
});

export const mutations = {
  SET_CONNECTED_DATA(state, payload) {
    state.connected = payload;
  },
  SET_ADDRESS_DATA(state, payload) {
    state.address = payload;
  },
  SET_BALANCE_DATA(state, payload) {
    state.balance = payload;
  },
  SET_NETWORK_DATA(state, payload) {
    state.network = payload;
  },
  SET_USER_GROUP_DATA(state, payload) {
    state.userGroups = payload;
  },
};

export const actions = {
  async connectWallet({ commit }) {
    if (!window.ethereum) {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }

    commit("SET_CONNECTED_DATA", true);

    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("1", provider);

    // connect users accounts
    const accounts = await provider.send("eth_requestAccounts", []);
    commit("SET_USER_GROUP_DATA", accounts);
    commit("SET_ADDRESS_DATA", accounts[0]);
    console.log("2", accounts);

    // const signer = provider.getSigner();
    // console.log("3", signer);

    const balance = await provider.getBalance(accounts[0]);
    commit("SET_BALANCE_DATA", ethers.utils.formatEther(balance));
    console.log("4", ethers.utils.formatEther(balance));

    const network = await provider.getNetwork(); // 1 is main network others is test network
    commit("SET_NETWORK_DATA", network.chainId);

    // const web3 = window.ethereum;
    // commit("SET_CONNECTED_DATA", true);

    // const userGroups = await web3.eth.getAccounts(); //used to interact with all of your accounts.
    // commit("SET_USER_GROUP_DATA", userGroups);

    // const network = await web3.eth.net.getId(); // 1 is main network others is test network
    // commit("SET_NETWORK_DATA", network);

    // const address = await web3.eth.getCoinbase(); //used to get your primary (first) account.
    // commit("SET_ADDRESS_DATA", address);

    // const balanceWei = await web3.eth.getBalance(address);
    // const balance = await web3.utils.fromWei(balanceWei, "ether");
    // commit("SET_BALANCE_DATA", balance);
  },
  setConnectedData() {
    return new Promise((resolve, reject) => {
      commit("SET_CONNECTED_DATA", true);
      resolve();
    });
  },
  setAddressData() {
    return new Promise((resolve, reject) => {
      commit("SET_ADDRESS_DATA", "JKL00012");
      resolve();
    });
  },
  setAddressData() {
    return new Promise((resolve, reject) => {
      commit("SET_ADDRESS_DATA", "JKL00012");
      resolve();
    });
  },
  setBalanceData() {
    return new Promise((resolve, reject) => {
      commit("SET_BALANCE_DATA", "JKL00012");
      resolve();
    });
  },
  setNetworkData() {
    return new Promise((resolve, reject) => {
      commit("SET_NETWORK_DATA", "JKL00012");
      resolve();
    });
  },
  setUserGroupData() {
    return new Promise((resolve, reject) => {
      commit("SET_USER_GROUP_DATA", []);
      resolve();
    });
  },
};
