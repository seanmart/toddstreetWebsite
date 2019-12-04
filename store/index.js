export default{
  state(){
    return{
      mode: null,
      menu: false
    }
  },
  mutations:{
    setMode(state,x){
      state.mode = x
    },
    setMenu(state,x){
      state.menu = x
    }
  },
  actions:{
    nuxtClientInit({ commit,state }, context) {

      let handleResize = ()=>{
        let width = window.innerWidth
        width < 600
        ? state.mode !== 'mobile' && commit('setMode','mobile')
        : width < 1000
        ? state.mode !== 'tablet' && commit('setMode','tablet')
        : state.mode !== 'desktop' && commit('setMode','desktop')
      }

      window.addEventListener('resize',handleResize)

      setTimeout(()=>handleResize(),0)
    }
  }
}
