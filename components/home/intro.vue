<template lang="html">
  <div id="intro" data-scroll-section ref="intro">
    <div class="intro-video" ref="video">
      <v-video :video="data.video" muted loop :play="playVideo"/>
    </div>
    <div class="intro-text" data-scroll :data-scroll-speed="parallax ? 5 : 0">
      <vText :text="data.text" tag="p" :play="animateText" :speed=".8" :stagger=".15" />
    </div>
  </div>
</template>

<script>
import vVideo from "@/components/common/video";
import vText from "@/components/common/text";
import data from "@/assets/data";
import {mapState} from 'vuex'
export default {
  props: ["data"],
  components: { vVideo, vText },
  computed:mapState(['parallax','ready']),
  data(){
    return{
      playVideo: false,
      animateText: false
    }
  },
  watch:{
    ready(ready){
      this.$gsap.to(this.$refs.video,5,{opacity:1})
      this.playVideo = true
      setTimeout(()=> this.animateText = true,1000)
    }
  }
};
</script>

<style lang="scss">
#intro {
  height: 100vh;
  position: relative;
}

#intro .intro-video {
  position: absolute;
  height: 100%;
  width: 100%;
}

#intro .intro-video{
  opacity: 0;
}

#intro .intro-video .video{
  opacity: 0.2;
}

#intro .intro-text {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: $padding;
  font-size: calc(20px + 2vw);
  line-height: 150%;
}

@media screen and (max-width: $mobile){
  #intro .intro-text{
    padding: $paddingMobile;
  }
}

</style>
