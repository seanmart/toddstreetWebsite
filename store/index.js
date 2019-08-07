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
    nuxtServerInit({ dispatch }) {
      dispatch("data/getPages");
      dispatch("data/getData");
    }
  }
};
