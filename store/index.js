import data from "./data";
import animation from "./animation";

export default {
  modules: { data, animation },
  state: () => ({
    ready: false,
    scrolled: false,
    mobile: false
  }),
  mutations: {
    scrolled(state, scrolled) {
      state.scrolled = scrolled;
    },
    mobile(state, mobile) {
      state.mobile = mobile;
    },
    ready(state, ready) {
      state.ready = ready;
    }
  },
  actions: {
    mobile({ commit, dispatch, getters }, action) {
      commit("mobile", action);
      getters.ready && dispatch("animation/mobile", action ? "in" : "out");
    },
    nuxtServerInit({ dispatch }) {
      dispatch("data/getPages");
      dispatch("data/getData");
    }
  }
};
