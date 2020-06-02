export default {
  state:()=>({
    ready: false,
    loaded: false
  }),
  mutations:{
    ready(state, x){
      state.ready = x
    },
    loaded(state,x){
      state.loaded = x
    }
  }
}
