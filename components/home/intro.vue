<template lang="html">
  <div id="intro" data-scroll-section ref="intro">
    <div class="intro-video-fade" ref="video">
      <v-video class="intro-video" :video="data.video" muted loop :play="playVideo"/>
    </div>
    <div class="intro-text padding" data-scroll data-scroll-speed="15">
      <vText class="big copy" :text="data.text" :play="animateText"/>
    </div>
  </div>
</template>

<script>
import vVideo from '@/components/common/video'
import vText from '@/components/common/text'
import data from '@/assets/data'
export default {
  props:['data'],
  components:{vVideo,vText},
  data(){
    return{
      animateText: false,
      playVideo: false
    }
  },
  mounted(){
    let videoAnimation = this.$gsap.to(this.$refs.video,{opacity: 0}).pause()

    let scene = new this.$scrollBuddy.scene({
      el: this.$refs.intro
    })

    scene.onScroll((e)=>{
      videoAnimation.progress(e.percent)
    })

    scene.onEnter(()=>{
      this.playVideo = true
      setTimeout(()=>this.animateText = true,250)
    })

    scene.onExit(()=> this.playVideo = false)

  }
}
</script>

<style lang="scss">
  #intro{
    height: 100vh;
    position: relative;
  }

  #intro .intro-video{
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: .2
  }

  #intro .intro-text{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>
