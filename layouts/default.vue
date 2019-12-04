<template>
    <div id="site">
      <top/>
      <nuxt />
      <bottom/>
    </div>
</template>
<script>
import top from '@/components/site/top'
import bottom from '@/components/site/bottom'
import {mapState} from 'vuex'
  export default{
    components:{top,bottom},
    computed: mapState(['menu']),
  }
</script>
<style lang="scss">
  #site{
    color: $color
  }

</style>
