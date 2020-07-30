export default{
  state:()=>({
    ready: false,
    carePosts:[]
  }),
  mutations:{
    ready(state, ready){
      state.ready = ready
    },
    posts(state,{key, posts}){
      state[key] = posts
    }
  },
  actions:{
    nuxtServerInit({commit}){

      let files = require.context('../assets/care', true, /.md/)
      let posts = {}

      posts.carePosts = files.keys().map(key => {
        let id = key.replace('.md','').replace('./','')
        return {
          ...files(key).attributes,
          id: id,
          html:files(key).html,
          body: files(key).body,
          link: `/care/${id}`
        }
      })

      Object.keys(posts).map(key => {
        commit('posts',{key, posts: posts[key].sort((a,b)=>new Date(b.date) - new Date(a.date))})
      })
    }
  }
}
