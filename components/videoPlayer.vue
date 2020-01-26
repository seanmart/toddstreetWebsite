<template lang="html">
  <div class="video-player" v-if="videoId" :class="{hide}">
    <div class="video-player-wrapper" v-scroll="{onRender}">
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
    videoId: { type: String, default: null }
  },
  data() {
    return {
      wistia: null,
      hide: false
    };
  },
  mounted() {
    this.setVideo();
  },
  watch:{
    hide(hide){
      this.toggleVideo()
    }
  },
  methods: {
    onRender(visible){
      if (!this.wistia) return
      this.hide = !visible
    },
    setVideo() {
      let interval;

      let check = () => {
        if (!Wistia) return
        let w = Wistia.api(`${this.videoId}`);
        if (w) {
          clearInterval(interval);
          this.wistia = w;
          this.toggleVideo()
        }
      };

      interval = setInterval(check, 100);
    },
    toggleVideo(){
      this.hide ? this.wistia.pause() : this.wistia.play()
    }
  }
};
</script>

<style lang="scss">
.video-player {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &.hide{
    opacity: 0;
  }

  .video-player-wrapper {
    flex: 0 0 177.777vh;
    min-width: 100vw;
    min-height: 100vh;
    pointer-events: none;
  }
}
</style>
