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
import {mapState} from 'vuex'
export default{
  components:{top,splash},
  mounted(){
    this.$scrollbuddy.pause()
  },
  watch:{
    dark(dark){
      dark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
    }
  },
  methods:{
    setReady(){
      this.$scrollbuddy.resume()
      this.$store.commit('set', {key: 'ready', value: true})
    }
  },
  computed: mapState(['dark'])
}
</script>
<style lang="scss">

  #site{
    width: 100vw;
    overflow: hidden;
    @include font('body');
  }
</style>
