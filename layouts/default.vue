<template>
  <div id="site">
    <splash class="splash" @ready="ready = true"/>
    <top />
    <nuxt />
  </div>
</template>
<script>
import top from '@/components/site/top'
import splash from '@/components/site/splash'
export default{
  components:{top,splash},
  mounted(){
    this.$scrollbuddy.pause()
  },
  watch:{
    ready(ready){
      ready
      ? this.$scrollbuddy.resume()
      : this.$scrollbuddy.pause()
    }
  },
  data(){
    return{
      ready: false
    }
  }
}
</script>
<style lang="scss">
  #site{
    width: 100vw;
    overflow: hidden;

    .splash{
      position: fixed;
      top: 0px;
      left: 0px;
      height: 100vh;
      width: 100vw;
      z-index: 100;

      &.hide{
        display: none;
      }
    }
  }
</style>
