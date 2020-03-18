<template>
  <div id="site">
    <splash class="splash" @ready="setReady"/>
    <top/>
    <nuxt/>
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
  methods:{
    setReady(){
      this.$scrollbuddy.resume()
      this.$store.commit('set', {key: 'ready', value: true})
    }
  }
}
</script>
<style lang="scss">

  #site{
    width: 100vw;
    overflow: hidden;
  }
</style>
