<template lang="html">
  <div class="video-player">

    <div class="video-container">
      <div v-if="videoId" :id="videoId" :class="`video wistia_embed wistia_async_${videoId}`"/>
    </div>

    <cursor-zone class="video-cursor-zone">
      <div class="button link--font link--sm" ref="button">
        play
      </div>
    </cursor-zone>

  </div>
</template>

<script>
import cursorZone from '@/components/cursorZone'
export default {
  components:{cursorZone},
  props:{
    videoId: {type: String, default: null},
    play: {type: Boolean, default: false}
  },
  data:()=>({
    wistia: null
  }),
  mounted(){
    if (this.videoId) this.setVideo()
  },
  watch:{
    play(play){
      if (play) {
        this.wistia.play()
      }
      if (!play) {
        this.wistia.pause()
      }
    },
  },
  methods:{
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
  overflow: hidden;

  .video-container{
    width: 100%;
    padding-bottom: 56.25%;
    background: black;

    .video{
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }
  }

  .video-cursor-zone{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button{
    height: 100px;
    width: 100px;
    background: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0px;
    cursor: pointer;
  }
}
</style>
