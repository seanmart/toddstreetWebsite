import { filter, orderBy, keyBy, groupBy } from "lodash";

export const state = () => ({
  staff: [],
  care: [],
  projects: [],
  offers: [],
  pages: [],
  animations: {
    intro: { show: false, duration: 500 },
    cover: { show: false, duration: 500 },
    topNav: { show: false, duration: 250 },
    menuButton: { show: false, duration: 250 },
    sidebar: { show: false, duration: 500 },
    logo: { show: false, duration: 250 }
  }
});

export const mutations = {
  setAnimationShow(state, key) {
    state.animations[key].show = true;
  },
  setAnimationHide(state, key) {
    state.animations[key].show = false;
  },
  setPage(state, page) {
    state.pages.push(page);
  },
  setData(state, { key, res }) {
    state[key] = res;
  }
};

export const actions = {
  transitionStart({ commit, state }) {
    let a = state.animations;
    let t = Math.max(a.logo.duration, a.menuButton.duration, a.topNav.duration);

    return new Promise((resolve, reject) => {
      commit("setAnimationHide", "logo");
      commit("setAnimationHide", "menuButton");
      commit("setAnimationHide", "topNav");
      setTimeout(() => {
        commit("setAnimationHide", "sidebar");
        setTimeout(() => {
          commit("setAnimationShow", "cover");
          setTimeout(() => resolve(), a.cover.duration);
        }, a.sidebar.duration / 2);
      }, t);
    });
  },
  transitionEnd({ commit, state }) {
    let a = state.animations;
    let t = Math.max(a.logo.duration, a.menuButton.duration, a.topNav.duration);

    return new Promise((resolve, reject) => {
      commit("setAnimationHide", "cover");
      setTimeout(() => {
        commit("setAnimationShow", "sidebar");
        setTimeout(() => {
          commit("setAnimationShow", "logo");
          commit("setAnimationShow", "menuButton");
          commit("setAnimationShow", "topNav");
          setTimeout(() => resolve(), t);
        }, a.sidebar.duration / 2);
      }, a.cover.duration);
    });
  },
  async nuxtServerInit({ commit }) {
    // pages
    let pages = require.context("../pages", true, /\.vue$/);
    pages.keys().forEach(page => {
      if (pages(page).default.data) {
        let data = pages(page).default.data();
        if (data.nav) {
          let path = page.match(/([^:\\/]*?)(?:\.([^ :\\/.]*))?$/)[1];
          if (path === "index") path = "";
          commit("setPage", { ...data.nav, path: "/" + path });
        }
      }
    });

    // data
    let data = {};
    data.staff = require.context("../content/staff", true, /\.markdown$/);
    data.projects = require.context("../content/projects", true, /\.markdown$/);
    data.care = require.context("../content/care", true, /\.markdown$/);
    data.clients = require.context("../content/clients", true, /\.markdown$/);
    data.stats = require.context("../content/stats", true, /\.markdown$/);
    data.thoughts = require.context("../content/thoughts", true, /\.markdown$/);
    data.offers = require.context("../content/offers", true, /\.markdown$/);

    await Object.keys(data).forEach(key => {
      Promise.all(data[key].keys().map(name => asyncImport(key, name))).then(
        res => commit("setData", { key, res })
      );
    });
  }
};

export const getters = {
  animationTime(state) {
    let animationTime = Object.keys(state.animations).reduce((time, a) => {
      return time + state.animations[a].duration;
    }, 0);
    return animationTime;
  },
  pages(state) {
    return orderBy(state.pages, "position");
  },
  projects(state) {
    return orderBy(state.projects, "position");
  },
  projectsOverview(state, getters) {
    return orderBy(filter(getters.projects, "overview"), "overview");
  },
  staff(state) {
    return groupBy(
      orderBy(filter(state.staff, i => i.published !== false), "position"),
      "department"
    );
  },
  allStaff(state) {
    return filter(state.staff, i => i.published !== false);
  },
  cares(state) {
    return orderBy(state.care, i => new Date(i.date), "desc");
  },
  caresOverview(state, getters) {
    return getters.cares.slice(0, 3);
  },
  careById(state) {
    return id => filter(state.care, { id })[0];
  },
  clients(state) {
    return groupBy(orderBy(state.clients, "position"), "category");
  },
  stats(state) {
    return orderBy(state.stats, "position");
  },
  thoughts(state) {
    return orderBy(state.thoughts, i => new Date(i.date), "desc");
  }
};

async function asyncImport(folder, name) {
  name = name.replace("./", "");
  let file = await import(`~/content/${folder}/${name}`);
  return { ...file.attributes, body: file.body, html: file.html };
}
