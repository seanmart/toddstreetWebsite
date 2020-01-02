<template>
  <div id="site">
    <top/>
    <nuxt />
  </div>
</template>
<script>
  import top from '@/components/top'
  export default{
    components:{top}
  }
</script>

<style lang="scss">
  #site{
    min-height: 100vh;
  }
</style>
