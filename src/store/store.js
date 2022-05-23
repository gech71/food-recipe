import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      user: null,
      accessToken: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAccessToken(state, payload) {
      state.accessToken = payload;
    },
  },
  actions: {
    SET_USER: ({ commit }, payload) => {
      commit("setUser", payload);
    },
    SET_ACCESS_TOKEN: ({ commit }, payload) => {
      commit("setAccessToken", payload);
    },
  },
});
