export default{
  state(){
    return{
      size: null,
      menu: false
    }
  },
  mutations:{
    set(state,{key, val}){
      state[key] = val
    }
  }
}
