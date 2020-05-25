<template lang="html">
  <section id="sizzle" v-section>
    <video-player v-element="[handleScroll,{offsetEnter: '10vh'}]"/>
  </section>
</template>

<script>
import videoPlayer from '@/components/videoPlayer'
export default {
  components:{videoPlayer},
  data(){
    return{
      animate:null
    }
  },
  mounted(){
    this.animate = this.$gsap.from('#sizzle .video-player',1,{yPercent: 50, scale: .5,opacity:0, ease: 'power4.out', paused: true})
  },
  methods:{
    handleScroll(e){
      if (e.entering && e.scroll.direction == 'down') this.animate.resume()
    }
  }
}
</script>

<style lang="scss">
#sizzle{

}
</style>
