export default{
  state:()=>({
    ready: false
  }),
  mutations:{
    set(state, {key, value}){
      state[key] = value
    }
  }
}
