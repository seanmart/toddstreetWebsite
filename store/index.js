export default {
  state: () => ({
    ready: false,
    delay: 0.5,
    nav: false
  }),
  mutations: {
    setReady(state, x) {
      state.ready = x;
    },
    setNav(state, x){
      state.nav = x
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
