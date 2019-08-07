import data from "./data";
import animation from "./animation";

export default {
  modules: { data, animation },
  state: () => ({
    scrolled: false,
    mobile: false,
    menu: false,
    transitioning: true,
  }),
  mutations: {
    scrolled(state, scrolled) {
      state.scrolled = scrolled;
    },
    mobile(state, mobile) {
      state.mobile = mobile;
    },
    menu(state, open) {
      state.menu = open;
    },
    transitioning(state, on) {
      state.transitioning = on;
    }
  },
  actions: {
    mobile({ commit, state, dispatch }, mobile) {
      commit("mobile", mobile);
      !state.transitioning && dispatch("animation/mobile", mobile);
    },
    scrolled({ commit, state, dispatch }, scrolled) {
      commit("scrolled", scrolled);
      dispatch("animation/scrolled", scrolled);
    },
    nuxtServerInit({ dispatch }) {
      dispatch("data/getPages");
      dispatch("data/getData");
    }
  }
};
