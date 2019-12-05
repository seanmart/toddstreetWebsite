export default{
  state(){
    return{
      disableParallax: false,
      menu: false
    }
  },
  mutations:{
    set(state,{key, val}){
      state[key] = val
    }
  }
}
