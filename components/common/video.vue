<template lang="html">
  <div class="video" v-if="video">
    <video :src="video" :muted="muted" :loop="loop" ref="video" playsinline/>
  </div>
</template>

<script>
export default {
  props:{
    video: {type:String, default: null},
    muted: Boolean,
    loop: Boolean,
    play: Boolean
  },
  mounted(){
    this.play ? this.$refs.video.play() : this.$refs.video.pause()
  },
  watch:{
    play(play){
      play ? this.$refs.video.play() : this.$refs.video.pause()
    }
  }
}
</script>

<style lang="css">
  .video{
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .video video{
    height: auto;
    width: auto;
    flex: 0 0 auto;
    min-width: 100%;
    min-height: 100%;
  }
</style>
