export default{
  state:()=>({
    ready: false,
    posts:[]
  }),
  mutations:{
    ready(state, x){
      state.ready = x
    },
    posts(state,posts){
      state.posts = posts
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
          link: `/${files(key).attributes.category}/${id}`
        }
      })

      commit('posts',posts)
    }
  },
  getters:{
    carePosts: state => state.posts.filter(post => post.category == 'care').sort((a,b)=>new Date(b.date) - new Date(a.date))
  }
}
