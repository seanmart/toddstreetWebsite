export default {
  state:()=>({
    ready: false,
    touch: false
  }),
  mutations:{
    ready(state, x){
      state.ready = x
    },
    touch(state, x){
      state.touch = x
    }
  }
}
