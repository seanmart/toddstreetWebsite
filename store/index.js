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

    }
  }
}
