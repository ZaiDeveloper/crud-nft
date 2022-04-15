// state
export const state = () => ({
  collections: [],
  user: [],
  owner: [],
});

export const mutations = {
  SET_COLLECTION_DATA(state, payload) {
    state.connected = payload;
  },
  SET_USER_DATA(state, payload) {
    state.user = payload;
  },
  SET_OWNER_DATA(state, payload) {
    state.owner = payload;
  },
};

export const actions = {
  getCollection({ commit }) {
    // get all token from smart contract
  },
  createImageNft() {
    return new Promise((resolve, reject) => {
      commit("SET_CONNECTED_DATA", true);
      resolve();
    });
  },
};
