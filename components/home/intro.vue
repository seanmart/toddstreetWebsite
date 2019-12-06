<template lang="html">
  <div id="intro" data-scroll-section ref="intro">
    <div class="intro-video" ref="video">
      <v-video :video="data.video" muted loop play />
    </div>
    <div class="intro-text" data-scroll :data-scroll-speed="disableParallax ? 0 : 5">
      <vText :text="data.text" tag="p" :play="ready" />
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
  computed:mapState(['disableParallax', 'ready']),
  mounted() {
    this.$gsap.fromTo(this.$refs.video,2,{opacity:0, scale:1.5},{opacity:1,scale:1})
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
  font-size: 3vw;
  line-height: 150%;
}

@media screen and (max-width: $tablet){
  #intro .intro-text{
    font-size: 5vw;
  }
}

@media screen and (max-width: $mobile){
  #intro .intro-text{
    font-size: 6.5vw;
    padding: $paddingMobile;
  }
}

</style>
