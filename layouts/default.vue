<template lang="html">

  <div id="site">

    <sidebar/>
    <bars/>

    <div id="scroll">
      <navigation/>
      <nuxt/>
    </div>

  </div>

</template>

<script>
import imagesLoaded from 'imagesloaded'
import {mapState} from 'vuex'
export default {
  mounted(){
    let ts = Date.now()
    imagesLoaded('html',{background: true},()=> {
      let diff = Math.max(1000 - (Date.now() - ts),0)
      setTimeout(()=>this.$store.commit('ready', true),diff)
    })

  },
  watch:{
    $route(){
      setTimeout(()=> this.$store.commit('ready', true),250)
    },
    ready(ready){
      if (!ready) return
      gsap.timeline()
          .add(scroller.refresh)
          .add(ScrollBuddy.init)
          .fromTo('#bars li',.75,{yPercent: 0},{yPercent: 100, stagger:.1, ease: 'power4.out'},0)
          .fromTo('nav span',.75,{yPercent: -105},{yPercent:0,stagger:.1, ease: 'power4.out'},.45)

    }
  },
  middleware({store}){
    if (process.server) return
    return new Promise((next)=>{
      gsap.timeline()
          .add(ScrollBuddy.kill)
          .add(()=>store.commit('ready', false),0)
          .fromTo('#bars li',.5,{yPercent: -100},{yPercent: 0, stagger:.1, ease: 'power4.in'},0)
          .add(next,1)
    })
  },
  computed: mapState(['ready']),
}
</script>

<style lang="scss">
#background{
  position: fixed;
  @include fullscreen;
  z-index: -1;
}

</style>
