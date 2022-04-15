import { ethers } from "ethers";
import MyNFT from "../../artifacts/contracts/MyNFT.sol/MyNFT.json";

export const state = () => ({
  contract: "",
});

export const mutations = {
  SET_CONTRACT_DATA(state, payload) {
    state.contract = payload;
  },
};

export const actions = {
  setContract({ commit, state }) {
    return new Promise((resolve, reject) => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // sign the transaction
      const signer = provider.getSigner();
      console.log(9, process.env.NFT_ADDRESS, MyNFT.abi, signer);
      const contract = new ethers.Contract(
        process.env.NFT_ADDRESS,
        MyNFT.abi,
        signer
      );
      console.log(10, contract);
      commit("SET_CONTRACT_DATA", contract);
      resolve(contract);
    });
  },
};
