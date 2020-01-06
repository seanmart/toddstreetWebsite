<template>
  <div id="site">
    <top/>
    <nuxt />
    <bottom/>
  </div>
</template>
<script>
  import top from '@/components/top'
  import bottom from '@/components/bottom'
  export default{
    components:{top, bottom}
  }
</script>

<style lang="scss">
  #site{
    min-height: 100vh;
    overflow: hidden;
  }
</style>
