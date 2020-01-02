<template lang="html">
  <div class="fullscreen-video" v-if="videoId" :class="{hide}">
    <div class="inner">
      <div
        :id="videoId"
        :class="`wistia_embed wistia_async_${videoId} videoFoam=true`"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoId: { type: String, default: null },
    play: Boolean,
    hide: Boolean
  },
  data() {
    return {
      wistia: null
    };
  },
  mounted() {
    if (!window.Wistia) return
    this.setVideo();
  },
  watch: {
    play(play) {
      this.wistia && this.toggleVideo(play);
    },
    hide(hide){
      this.wistia && this.toggleVideo(!hide);
    },
    wistia(w) {
      if (w) {
        this.wistia.pause();
        this.toggleVideo();
      }
    }
  },
  methods: {
    setVideo() {
      let interval;
      let check = () => {
        let w = Wistia.api(`${this.videoId}`);
        if (w) {
          clearInterval(interval);
          this.wistia = w;
        }
      };
      interval = setInterval(check, 100);
    },
    toggleVideo(play) {
      if (play) {
        this.wistia.play();
      } else {
        this.wistia.pause();
      }
    }
  }
};
</script>

<style lang="scss">
.fullscreen-video {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  &.hide{
    display: none;
  }

  .inner {
    flex: 0 0 177.777vh;
    min-width: 100vw;
    min-height: 100vh;
  }
}
</style>
