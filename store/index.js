


export default{
  state:()=>({
    links:[],
    mobile: false,
    tablet: false
  }),
  mutations:{
    set(state,{key, value}){
      state[key] = value
    }
  },
  actions:{
    nuxtServerInit({commit}){

      let links = []
      let files = require.context('../pages', true, /.vue$/)
      files.keys().forEach(page => {
        let dataFn = files(page).default.data
        if (dataFn) {
          let data = dataFn()
          if (data.nav){
            let url = page.replace('.','').replace('.vue','')
            links.push({...data.nav, to: url})
          }
        }
      })
      commit('set',{key: 'links', value: links.sort((a,b) => a.index < b.index)})
    }
  }
}
