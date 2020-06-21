export default{
  state:()=>({
    ready: false
  }),
  mutations:{
    ready(state, x){
      state.ready = x
    }
  }
}
