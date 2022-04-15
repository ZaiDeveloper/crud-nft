export const state = () => ({
  ipfs: "",
});

export const mutations = {
  SET_IPFS_DATA(state, payload) {
    state.ipfs = payload;
  },
};

export const actions = {
  store() {
    return new Promise((resolve, reject) => {
      commit("SET_IPFS_DATA", "");
      resolve();
    });
  },
  save({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      this.$axios
        .post(`/pinning/pinFileToIPFS`, payload, {
          headers: {
            pinata_api_key: process.env.PINATA_API_KEY,
            pinata_secret_api_key: process.env.PINATA_API_SECRETE,
          },
        })
        .then((response) => {
          commit("SET_IPFS_DATA", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
