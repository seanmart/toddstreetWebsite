<template>
  <div id="site">
    <top/>
    <nuxt />
    <bottom/>
  </div>
</template>
<script>
  import top from '@/sections/site/top'
  import bottom from '@/sections/site/bottom'
  import {mapState} from 'vuex'
  export default{
    components:{top, bottom},
    computed: mapState(['scroll']),
    watch:{
      scroll(scroll){
        scroll
        ? this.$scrollbuddy.resume()
        : this.$scrollbuddy.pause()
      }
    }
  }
</script>

<style lang="scss">
  #site{
    min-height: 100vh;
    overflow: hidden;
  }
</style>
