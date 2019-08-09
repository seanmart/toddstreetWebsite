import { filter, orderBy, keyBy, groupBy } from "lodash";

const state = () => ({
  staff: [],
  care: [],
  projects: [],
  offers: [],
  pages: {}
});

const mutations = {
  setPage(state, { key, page }) {
    state.pages[key] = page;
  },
  setData(state, { key, res }) {
    state[key] = res;
  }
};

const actions = {
  getPages({ commit }) {
    let pages = require.context("../content/data", true, /\.js/);
    pages.keys().forEach(page => {
      let data = pages(page);
      let name = page.match(/([^:\\/]*?)(?:\.([^ :\\/.]*))?$/)[1];
      data.meta.path = name === "index" ? "/" : "/" + name;
      commit("setPage", { page: data, key: name });
    });
  },
  async getData({ commit }) {
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

const getters = {
  navPages(state) {
    let meta = Object.keys(state.pages).map(page => state.pages[page].meta);
    return orderBy(filter(meta, "navPosition"), "navPosition");
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

export default { state, mutations, actions, getters };
