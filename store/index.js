export default {
  state:()=>({
    ready: false,
    loaded: false,
    navColor: '#000',
    navColorPrevious:null,
    care: []
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
    posts(state,{type, posts}){
      state[type] = posts
    }
  },
  actions:{
    nuxtServerInit({commit}){
      let files = require.context('../assets/data/posts', true, /.md/)
      let posts = files.keys().map(key => {
        let id = key.replace('.md','').replace('./','')
        return {
          ...files(key).attributes,
          id: id,
          html:files(key).html,
          body: files(key).body,
          link: {path: files(key).attributes.category, query:{id}}
        }
      })

      commit('posts',{type: 'care', posts: posts.filter(p => p.category == 'care')})
    }
  }
}
