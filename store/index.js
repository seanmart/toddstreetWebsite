import { filter, orderBy, keyBy } from 'lodash'

export const state = () => ({
  staff: [],
  work: [],
  care: [],
  clients: [],
  stats: [],
  icons: [],
  thoughts: [],
  information: {
    company: 'toddstreet',
    address: {
      street: '30 W 24th Street, Floor 11',
      city: 'New York',
      state: 'NY',
      zip: '10010',
      phone: '212.966.5900'
    },
    emails: ['contact@toddstreet.com', 'hr@toddstreet.com']
  },
  nav: [
    { route: '/', label: 'About Us' },
    { route: '/projects', label: 'Our Projects' },
    { route: '/care', label: 'We Care' },
    { route: '/thoughts', label: 'Thought Leadership' }
  ]
})

export const actions = {
  async nuxtServerInit({ commit }) {
    let data = {}
    data.staff = require.context('../content/staff', true, /\.markdown$/)
    data.work = require.context('../content/work', true, /\.markdown$/)
    data.care = require.context('../content/care', true, /\.markdown$/)
    data.clients = require.context('../content/clients', true, /\.markdown$/)
    data.stats = require.context('../content/stats', true, /\.markdown$/)
    data.icons = require.context('../content/icons', true, /\.markdown$/)
    data.thoughts = require.context('../content/thoughts', true, /\.markdown$/)

    await Object.keys(data).forEach(key => {
      Promise.all(data[key].keys().map(name => asyncImport(key, name))).then(
        res => commit('add', { key, res })
      )
    })
  }
}

export const mutations = {
  add(state, { key, res }) {
    state[key] = res
  }
}

export const getters = {
  projects(state) {
    return orderBy(state.work, 'position')
  },
  staffLeaders(state) {
    return orderBy(
      filter(
        state.staff,
        i => i.published !== false && i.department === 'Leadership'
      ),
      'position'
    )
  },
  staffWorkers(state) {
    return orderBy(
      filter(
        state.staff,
        i => i.department !== 'Leadership' && i.published !== false
      ),
      i => i.title.split(' ')[1]
    )
  },
  allWorkers(state) {
    return orderBy(
      filter(state.staff, i => i.published !== false),
      i => i.title.split(' ')[1]
    )
  },
  staffCount(state, getters) {
    return getters.staffLeaders.length + getters.staffWorkers.length
  },
  cares(state) {
    return orderBy(state.care, i => new Date(i.date), 'desc')
  },
  clients(state) {
    return orderBy(state.clients, 'position')
  },
  stats(state) {
    return orderBy(state.stats, 'position')
  },
  icons(state) {
    return keyBy(state.icons, 'title')
  },
  thoughts(state) {
    return orderBy(state.thoughts, i => new Date(i.date), 'desc')
  },
  caresOverview(state, getters) {
    return getters.cares.slice(0, 3)
  },
  projectsOverview(state) {
    return orderBy(filter(state.work, 'overview'), 'overview')
  },
  careById(state) {
    return id => filter(state.care, { id })[0]
  }
}

async function asyncImport(folder, name) {
  name = name.replace('./', '')
  let file = await import(`~/content/${folder}/${name}`)
  return { ...file.attributes, body: file.body, html: file.html }
}
