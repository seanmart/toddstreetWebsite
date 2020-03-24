export default{
  state:()=>({
    ready: false,
    dark: false
  }),
  mutations:{
    set(state, {key, value}){
      state[key] = value
    }
  }
}
