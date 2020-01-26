export default {
  state: () => ({
    ready: false,
    delay: 0.5,
    navLogo: true,
    navMenu: true,
    scroll: true
  }),
  mutations: {
    setScroll(state, x){
      state.scroll = x
    },
    setReady(state, x) {
      state.ready = x;
    },
    setNavLogo(state, x){
      state.navLogo = x
    },
    setNavMenu(state, x){
      state.navMenu = x
    }
  },
  actions: {
    nuxtClientInit({ commit, state }, context) {
      window.addEventListener("load", () => {
        setTimeout(() => commit("setReady", true), state.delay * 1000);
      });
    }
  }
};
