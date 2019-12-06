export default{
  state(){
    return{
      disableParallax: false,
      menu: false,
      ready: false
    }
  },
  mutations:{
    set(state,{key, val}){
      state[key] = val
    }
  }
}
