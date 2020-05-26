<template>
  <div id="page" v-page>
    <site-header/>
    <nuxt />
    <site-footer/>
  </div>
</template>
<script>
import siteHeader from '@/components/siteHeader'
import siteFooter from '@/components/siteFooter'
export default{
  components:{siteHeader,siteFooter},
  watch:{
    $route(){
      setTimeout(this.$vb.updatePage,1250)
    }
  }
}
</script>
<style>

#page{
  overflow: hidden;
  width: 100vw;
}

.page-enter-active, .page-leave-active {
  transition: 1s
}
.page-enter, .page-leave-active{
  opacity: 0;
}
</style>
