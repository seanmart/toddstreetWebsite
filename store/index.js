export default{
  state:()=>({
    ready: false,
    care:[],
    projects:[]
  }),
  mutations:{
    ready(state, ready){
      state.ready = ready
    },
    set(state,{key, items}){
      state[key] = items
    }
  },
  actions:{
    nuxtServerInit({dispatch}){

      dispatch('getCare')
      dispatch('getProjects')

    },
    getCare({commit}){
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

      commit('set',{key: 'care', items})
    },
    getProjects({commit}){
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

      commit('set',{key: 'projects', items})
    }
  }
}
