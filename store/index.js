import vars from '@/assets/scss/variables.scss'

export default{

  state:()=>({
    ready: false,
  }),
  mutations:{
    setReady(state, x){
      state.ready = x
    }
  }
}
