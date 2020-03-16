<template>
  <div id="site">
    <top/>
    <nuxt />
  </div>
</template>
<script>
import top from '@/components/site/top'
export default{
  components:{top}
}
</script>
<style lang="scss">
  #site{
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
  }
</style>
