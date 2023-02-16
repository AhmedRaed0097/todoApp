export const state = () => ({
  users: [],
  user: {},
  isLoggedIn: false,
});

export const mutations = {
  SETTOUSERS(state, payload) {
    state.users = payload;
  },
  SETLOGGEDUSER(state, payload) {
    state.user = payload;
    state.isLoggedIn = true;
  },
  LOGOUTUSER(state, payload) {
    state.user = {};
    state.isLoggedIn = false;
  },
};

export const actions = {
  async fetchUsers({ commit, dispatch }) {
    return await this.$axios
      .$get("/users")
      .then((response) => {
        commit("SETTOUSERS", response);
      })
      .catch(() => {
      });
  },
  async login({ commit }, userData) {
    commit('SETLOGGEDUSER',userData)
  },
  async logout({ commit }, userData) {
    commit('LOGOUTUSER')
  }

};
