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
    mobile({ commit, state, dispatch }, mobile) {
      commit("mobile", mobile);
      state.ready && dispatch("animation/mobile", mobile);
    },
    scrolled({ commit, state, dispatch }, scrolled) {
      commit("scrolled", scrolled);
      state.ready && dispatch("animation/scrolled", scrolled);
    },
    nuxtServerInit({ dispatch }) {
      dispatch("data/getPages");
      dispatch("data/getData");
    }
  }
};
