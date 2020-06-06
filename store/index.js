export default {
  state:()=>({
    ready: false,
    loaded: false,
    navColor: '#000',
    navColorPrevious:null,
    posts: [],
    links:[]
  }),
  mutations:{
    ready(state, x){
      state.ready = x
    },
    loaded(state,x){
      state.loaded = x
    },
    navColor(state,x){
      if (x){
        state.navColorPrevious = state.navColor
        state.navColor = x
      } else {
        state.navColor = state.navColorPrevious
        state.navColorPrevious = null
      }
    },
    posts(state,x){
      state.posts = x
    },
    links(state,x){
      state.links = x
    }
  },
  actions:{
    nuxtServerInit({dispatch}){
      dispatch('addPosts')
      dispatch('addLinks')
    },
    addPosts({commit}){
      let files = require.context('../assets/data/posts', true, /.md/)
      let posts = files.keys().map(key => {
        return {
          ...files(key).attributes,
          html:files(key).html,
          to: `/posts/${key.replace('.md','')}`
        }
      })
      commit('posts',posts)
    },
    addLinks({commit}){
      let links = []
      let files = require.context('../pages', true, /.vue$/)
      files.keys().forEach(page => {
        let dataFn = files(page).default.data
        if (dataFn) {
          let data = dataFn()
          if (data.navbar){
            let url = page.replace('.','').replace('.vue','')
            links.push({...data.navbar, to: url})
          }
        }
      })
      links = links.sort((a,b) => a.order < b.order)
      commit('links',links)
    }
  }
}
