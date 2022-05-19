import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      user: null,
      accessToken: null,
      reloadBeforeRouteEntry: true,
      pageLoading: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAccessToken(state, payload) {
      state.accessToken = payload;
    },
    setReloadBeforeRouteEntry(state, payload) {
      state.reloadBeforeRouteEntry = payload;
    },
    setPageLoading(state, payload) {
      state.pageLoading = payload;
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
