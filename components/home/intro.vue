<template lang="html">
  <div id="intro" data-scroll-section ref="intro">
    <v-video class="intro-video" :video="data.video" muted loop play />
    <div class="intro-text" data-scroll :data-scroll-speed="disableParallax ? 0 : 5">
      <vText class="big copy" :text="data.text" tag="p" play />
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
  computed:mapState(['disableParallax']),
  data() {
    return {
      animateText: false,
      playVideo: false
    };
  },
  mounted() {}
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
  opacity: 0.2;
}

#intro .intro-text {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: $padding;
  font-size: 3.5vw;
  line-height: 150%;
}

@media screen and (max-width: $tablet){
  #intro .intro-text{
    font-size: 28px;
  }
}

@media screen and (max-width: $mobile){
  #intro .intro-text{
    font-size: 21px;
    line-height: 180%;
    padding: $paddingMobile;
  }
}

</style>
