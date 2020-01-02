<template lang="html">
  <div id="intro" data-scroll-section ref="intro">
    <div class="intro-video" ref="video">
        <iframe
          src="https://fast.wistia.net/embed/iframe/5k71u7zdpe?seo=false&videoFoam=true"
          title="testVideo2"
          allowtransparency="true"
          frameborder="0"
          scrolling="no"
          class="wistia_embed"
          name="wistia_embed"
          allowfullscreen
          mozallowfullscreen
          webkitallowfullscreen
          oallowfullscreen
          msallowfullscreen
          width="100%"
          height="100%"
        ></iframe>
    </div>
    <div class="intro-text" data-scroll :data-scroll-speed="parallax ? 5 : 0">
      <v-text
        :text="data.text"
        tag="p"
        :play="animateText"
        :speed="0.8"
        :stagger="0.15"
      />
    </div>
  </div>
</template>

<script>
import vVideo from "@/components/common/video";
import vText from "@/components/common/text";
import data from "@/assets/data";
import { mapState } from "vuex";
export default {
  props: ["data"],
  components: { vVideo, vText },
  computed: mapState(["parallax", "ready"]),
  mounted() {

  },
  data() {
    return {
      hideVideo: false,
      animateText: false
    };
  },
  watch: {
    ready(ready) {
      this.$gsap.to(this.$refs.video, 5, { opacity: 0.2 });
      setTimeout(() => (this.animateText = true), 1000);
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

@media screen and (max-width: $mobile) {
  #intro .intro-text {
    padding: $paddingMobile;
  }
}
</style>
