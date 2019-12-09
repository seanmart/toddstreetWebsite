export default{
  state(){
    return{
      parallax: true,
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
