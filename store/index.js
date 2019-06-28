export const state = () => ({
  pages: {}
});

export const mutations = {
  setPage(state, page) {
    state.pages[page.label] = page;
  }
};

export const actions = {
  nuxtServerInit({ commit }) {
    let pages = require.context("../pages", true, /\.vue$/);
    pages.keys().forEach(page => {
      if (pages(page).default.data) {
        let data = pages(page).default.data();
        if (data.nav) {
          commit("setPage", data.nav);
        }
      }
    });
  }
};
