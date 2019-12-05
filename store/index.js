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
    initMode({commit}){
      let width = window.innerWidth
      let mode = width < 680 ? 'mobile' : width < 980 ? 'tablet' : 'desktop'
      commit('setMode', mode)
    }
  }
}
