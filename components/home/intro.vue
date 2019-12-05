<template lang="html">
  <div id="intro" data-scroll-section ref="intro">
    <v-video class="intro-video" :video="data.video" muted loop play />
    <div class="intro-text padding" data-scroll data-scroll-speed="5">
      <vText class="big copy" :text="data.text" play />
    </div>
  </div>
</template>

<script>
import vVideo from "@/components/common/video";
import vText from "@/components/common/text";
import data from "@/assets/data";
export default {
  props: ["data"],
  components: { vVideo, vText },
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
}
</style>
