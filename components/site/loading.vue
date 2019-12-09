<template lang="html">
  <div id="loading">
    loading
  </div>
</template>

<script>
export default {
  props:{hide:Boolean},
  watch:{
    hide(){
      let tl = new this.$gsap.timeline
      tl.to('#loading', 1,{opacity: 0},0)
      tl.set('#loading',{display: 'none'})
    }
  },
  mounted(){
    window.addEventListener('load', ()=> this.$store.commit('set',{key: 'ready', val: true}))
  }
}
</script>

<style lang="scss">
#loading{
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background: $bg;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
