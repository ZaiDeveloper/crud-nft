import { ethers } from "ethers";
import MyNFT from "../../artifacts/contracts/MyNFT.sol/MyNFT.json";

export default ({ app }, inject) => {
  const helper = {
    getContract() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // sign the transaction
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NFT_ADDRESS,
        MyNFT.abi,
        signer
      );
      return contract;
    },
  };

  inject("helper", helper);
};
