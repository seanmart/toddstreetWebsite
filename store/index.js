export default{
  state:()=>({
    ready: false,
    menu: false,
    lightbox: {
      media:[],
      startOn: 0
    },
    care:[],
    projects:[]
  }),
  mutations:{
    ready(state, ready){
      state.ready = ready
    },
    set(state,{key, val}){
      state[key] = val
    },
    lightbox(state,{media = [], startOn = 0}){
      state.lightbox = {media,startOn}
    }
  },
  getters:{
    projectsByID(state){
      let projects = state.projects.reduce((a,c) => {
        a[c.id] = c
        return a
      },{})

      console.log(projects)
      return projects
    }
  },
  actions:{
    nuxtServerInit({dispatch}){

      dispatch('openCares')
      dispatch('openProjects')

    },
    openCares({commit}){
      let files = require.context(`../assets/data/care`, true, /.md/)
      let items = files.keys().map(file => {

        let id = file.replace('.md','').replace('./','')

        return {
          ...files(file).attributes,
          id: id,
          html: files(file).html,
          body: files(file).body,
          link: `/care/${id}`
        }
      })

      items = items.sort((a,b)=>new Date(b.date) - new Date(a.date))

      commit('set',{key: 'care', val: items})
    },
    openProjects({commit}){
      let files = require.context(`../assets/data/projects`, true, /.md/)
      let items = files.keys().map(file => {

        let id = file.replace('.md','').replace('./','')

        return {
          ...files(file).attributes,
          id: id,
          html: files(file).html,
          body: files(file).body,
          link: `/projects/${id}`
        }
      })

      commit('set',{key: 'projects', val: items})
    },
    openMenu({commit}){
      commit('set',{key: 'menu',val: true})
    },
    closeMenu({commit}){
      commit('set',{key: 'menu',val: false})
    }
  }
}
