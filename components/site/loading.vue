<template lang="html">
  <div id="loading">
    loading
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(['ready']),
  watch:{
    ready(){
      let tl = new this.$gsap.timeline
      tl.to('#loading', 1,{opacity: 0},0)
      tl.set('#loading',{display: 'none'})
    }
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
