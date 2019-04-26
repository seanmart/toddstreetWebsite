import { filter, orderBy, keyBy } from "lodash";

export const state = () => ({
  staff: [],
  work: [],
  care: [],
  clients: [],
  stats: [],
  icons: [],
  information: {
    company: "toddstreet",
    address: {
      street: "30 W 24th Street",
      city: "New York",
      state: "NY",
      zip: "10010",
      phone: ""
    }
  },
  nav: [
    { route: "/", label: "About Us" },
    { route: "/work", label: "Our Work" },
    { route: "/care", label: "We Care" },
    { route: "/contact", label: "Contact Us" }
  ]
});

export const actions = {
  async nuxtServerInit({ commit }) {
    let data = {};
    data.staff = require.context("../content/staff", true, /\.markdown$/);
    data.work = require.context("../content/work", true, /\.markdown$/);
    data.care = require.context("../content/care", true, /\.markdown$/);
    data.clients = require.context("../content/clients", true, /\.markdown$/);
    data.stats = require.context("../content/stats", true, /\.markdown$/);
    data.icons = require.context("../content/icons", true, /\.markdown$/);

    await Object.keys(data).forEach(key => {
      Promise.all(data[key].keys().map(name => asyncImport(key, name))).then(
        res => commit("add", { key, res })
      );
    });
  }
};

export const mutations = {
  add(state, { key, res }) {
    state[key] = res;
  }
};

export const getters = {
  workOverview(state) {
    return orderBy(filter(state.work, "overview"), "overview");
  },
  staffLeaders(state) {
    return orderBy(
      filter(
        state.staff,
        i => i.published !== false && i.department === "Leadership"
      ),
      i => i.title.split(" ")[1]
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
  staffCount(state, getters) {
    return getters.staffLeaders.length + getters.staffWorkers.length;
  },
  careOverview(state) {
    return orderBy(filter(state.care, "overview"), "date");
  },
  clients(state) {
    return orderBy(state.clients, "position");
  },
  stats(state) {
    return orderBy(state.stats, "position");
  },
  icons(state) {
    return keyBy(state.icons, "title");
  }
};

async function asyncImport(folder, name) {
  name = name.replace("./", "");
  let file = await import(`~/content/${folder}/${name}`);
  return { ...file.attributes, body: file.body };
}
