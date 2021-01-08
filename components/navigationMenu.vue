<template lang="html">
  <aside id="menu" ref="menu">
    test
  </aside>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: mapState(['menu']),
  watch:{
    menu(m){
      m
      ? gsap.to(this.$refs.menu,.75,{xPercent: 100, ease: 'power4.out'})
      : gsap.to(this.$refs.menu,.5,{xPercent: 0,ease: 'power4.in'})
    }
  }
}
</script>

<style lang="scss">
  #menu{
    position: fixed;
    top: 0px;
    width: 100vw;
    height: 100vh;
    right: 100%;
    background: $midnight;
    z-index: 99;
  }
</style>
