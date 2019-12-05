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
    initMode({ commit,state }, context) {
      let mode = getMode()
      commit('setMode', mode)
    },
    updateMode({commit, state}){
      let mode = getMode()
      if (mode !== state.mode ) commit('setMode', mode)
    }
  }
}

function getMode(){
  let width = window.innerWidth
  return width < 680 ? 'mobile' : width < 980 ? 'tablet' : 'desktop'
}
