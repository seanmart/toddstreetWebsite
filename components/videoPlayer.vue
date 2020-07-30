<template lang="html">
  <div class="video-player" @click="togglePlay">
    <div class="video-container">
      <div v-if="videoId" :id="videoId" :class="`video wistia_embed wistia_async_${videoId}`"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    videoId: {type: String, default: null},
    play: {type: Boolean, default: false}
  },
  data:()=>({
    wistia: null,
    videoPlaying: false
  }),
  mounted(){
    if (this.videoId) this.setVideo()
  },
  watch:{
    wistia(){
      setTimeout(()=> gsap.set('.w-video-wrapper',{clearProps:'background'}),500)
    },
    videoPlaying(play){
      play ? this.wistia.play() : this.wistia.pause()
    },
    play(play){
      this.togglePlay(play)
    },
  },
  methods:{
    togglePlay(){
      this.videoPlaying = ! this.videoPlaying
    },
    setVideo() {
      let interval;
      let check = () => {
        if (!Wistia) return
        let w = Wistia.api(`${this.videoId}`);
        if (w) {
          clearInterval(interval);
          this.wistia = w;
        }
      };
      interval = setInterval(check, 100);
    },
  }
}
</script>

<style lang="scss">
.video-player{
  position: relative;

  .video-container{
    width: 100%;
    padding-bottom: 56.25%;
    background: #eee;
    position: relative;
  }

  .video{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
}
</style>
