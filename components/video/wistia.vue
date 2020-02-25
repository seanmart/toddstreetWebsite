<template lang="html">
    <div
      v-if="videoId"
      :id="videoId"
      class="wistia"
      :class="[`wistia_embed wistia_async_${videoId} videoFoam=true`, {ready}]"
    />
</template>

<script>
export default {
  props:{
    videoId: {type: String, default: null},
    play: {type: Boolean, default: true}
  },
  data(){
    return{
      player: null,
      ready: false
    }
  },
  mounted() {
    this.videoId && this.setVideo();
  },
  watch:{
    ready(ready){
      this.$emit('ready', ready)
    },
    play(play){
      this.toggleVideo(play)
    }
  },
  methods: {
    onVisible(visible){
      if (visible && this.play){
        this.toggleVideo(true)
        return
      }
      this.toggleVideo(false)
    },
    toggleVideo(play){
      if (!this.player) return
      play ? this.player.play() : this.player.pause()
      this.ready = play
    },
    setVideo() {
      let interval;
      let check = () => {
        if (!Wistia) return
        clearInterval(interval);
        this.player = Wistia.api(`${this.videoId}`);
        this.toggleVideo(this.play)
        return
        }
      interval = setInterval(check, 100);
    }
  }
};
</script>

<style lang="scss">
.wistia{
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 1s;
  &.ready{
    opacity: 1;
  }
}
</style>
