import { filter, orderBy, keyBy } from "lodash";

export const state = () => ({
  pages: {},
  staff: [],
  care: [],
  projects: [],
  offers: []
});

export const mutations = {
  setPage(state, page) {
    state.pages[page.label] = page;
  },
  setData(state, { key, res }) {
    state[key] = res;
  }
};

export const actions = {
  async nuxtServerInit({ commit }) {
    let pages = require.context("../pages", true, /\.vue$/);
    pages.keys().forEach(page => {
      if (pages(page).default.data) {
        let data = pages(page).default.data();
        if (data.nav) {
          commit("setPage", data.nav);
        }
      }
    });

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
  projects(state) {
    return orderBy(state.projects, "position");
  },
  staffLeaders(state) {
    return orderBy(
      filter(
        state.staff,
        i => i.published !== false && i.department === "Leadership"
      ),
      "position"
    );
  },
  staffWorkers(state) {
    return orderBy(
      filter(
        state.staff,
        i => i.department !== "Leadership" && i.published !== false
      ),
      i => i.title.split(" ")[1]
    );
  },
  allWorkers(state) {
    return orderBy(
      filter(state.staff, i => i.published !== false),
      i => i.title.split(" ")[1]
    );
  },
  staffCount(state, getters) {
    return getters.staffLeaders.length + getters.staffWorkers.length;
  },
  cares(state) {
    return orderBy(state.care, i => new Date(i.date), "desc");
  },
  clients(state) {
    return orderBy(state.clients, "position");
  },
  stats(state) {
    return orderBy(state.stats, "position");
  },
  thoughts(state) {
    return orderBy(state.thoughts, i => new Date(i.date), "desc");
  },
  caresOverview(state, getters) {
    return getters.cares.slice(0, 3);
  },
  projectsOverview(state) {
    return orderBy(filter(state.projects, "overview"), "overview");
  },
  careById(state) {
    return id => filter(state.care, { id })[0];
  }
};

async function asyncImport(folder, name) {
  name = name.replace("./", "");
  let file = await import(`~/content/${folder}/${name}`);
  return { ...file.attributes, body: file.body, html: file.html };
}
