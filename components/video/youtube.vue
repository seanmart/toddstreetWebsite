<template lang="html">
  <div class="youtube" :class="{ready}">
    <div :id="videoId"/>
  </div>
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
  mounted(){
    if (this.videoId){
      document.body.appendChild(Object.assign(document.createElement('script'), {
        type: 'text/javascript',
        src: 'https://www.youtube.com/iframe_api',
        origin: process.env.baseUrl,
        onload: () => this.onYouTubeIframeAPIReady()
      }));
    }
  },
  watch:{
    play(play){
      this.toggleVideo(play)
    },
    ready(ready){
      this.$emit('ready', ready)
    }
  },
  methods:{
    toggleVideo(play){
      if (!this.player.playVideo) return
      play ? this.player.playVideo() : this.player.pauseVideo()
    },
    onYouTubeIframeAPIReady(){
      let interval;
      let check = () => {
        if (!YT) return
        clearInterval(interval)
        this.player = new YT.Player(this.videoId, {
            videoId: this.videoId,
            controls: 0,
            events:{
              'onReady': ()=> this.toggleVideo(this.play),
              'onStateChange': (e)=> this.ready = e.data == YT.PlayerState.PLAYING
            }
        });
        return
      };
      interval = setInterval(check, 100);
    }
  }
}
</script>

<style lang="scss">
.youtube{
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 1s;
  &.ready{
    opacity: 1;
  }
  iframe{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
  }
}
</style>
