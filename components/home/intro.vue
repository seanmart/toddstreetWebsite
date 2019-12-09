<template lang="html">
  <div id="intro" data-scroll-section ref="intro">
    <div class="intro-video" ref="video">
      <script src="https://fast.wistia.com/embed/medias/5k71u7zdpe.jsonp" async>
      </script>
      <script src="https://fast.wistia.com/assets/external/E-v1.js" async>
      </script>
      <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;">
        <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
          <div class="wistia_embed wistia_async_5k71u7zdpe seo=false videoFoam=true autoplay=true" style="height:100%;position:relative;width:100%">
            <div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:100%;">
              <img src="https://fast.wistia.com/embed/medias/5k71u7zdpe/swatch" style="filter:blur(5px);height:100%;object-fit:contain;width:100%;" alt="" aria-hidden="true" onload="this.parentNode.style.opacity=1;" />
            </div>
          </div>
        </div>
      </div>
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
  opacity: 0;
}

#intro .intro-video .video{
  opacity: 0.2;
  min-width: 100%;
  min-height: 100%;
}

#intro .intro-text {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: $padding;
  font-size: calc(15px + 2.5vw);
  line-height: 150%;
}

@media screen and (max-width: $mobile){
  #intro .intro-text{
    padding: $paddingMobile;
  }
}

</style>
