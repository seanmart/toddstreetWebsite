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
    color(color){
      this.$gsap.to(document.documentElement,.5,color)
    }
  },
  methods:{
    setReady(){
      this.$scrollbuddy.resume()
      this.$store.commit('setReady',true)
    }
  },
  computed: mapState(['color'])
}
</script>
<style lang="scss">

  #site{
    width: 100vw;
    overflow: hidden;
    @include font('body');
  }
</style>
