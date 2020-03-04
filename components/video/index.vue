<template lang="html">
  <div class="video-player" ref="player">
    <div class="video-wrapper" ref="video" >
      <wistia v-if="wistia" :videoId="wistia" :play="playVideo" @ready="$emit('ready', $event)"/>
      <youtube v-else-if="youtube" :videoId="youtube" :play="playVideo" @ready="$emit('ready', $event)"/>
      <poster v-else-if="image" :image="image" @ready="$emit('ready', $event)"/>
    </div>
  </div>
</template>

<script>
import wistia from './wistia'
import youtube from './youtube'
import poster from './poster'
export default {
  components:{wistia, youtube, poster},
  props:{
    wistia: {type: String, defualt: null},
    youtube: {type: String, defualt: null},
    image: {type: String, default: null},
    play: {type: Boolean, default: true}
  },
  data(){
    return{
      playVideo: false
    }
  },
  mounted(){
    this.toggleVideo(this.play)
    window.addEventListener('resize', this.setVideoWidth)
    this.setVideoWidth()

  },
  destroy(){
    window.removeEventListener('resize', this.setVideoWidth)
  },
  watch:{
    play(play){
      this.toggleVideo(play)
    }
  },
  methods:{
    setVideoWidth(){
      let height = this.$refs.player.offsetHeight
      let width = this.$refs.player.offsetWidth
      this.$refs.video.style.width = `${Math.max(height * 1.777,width)}px`
      this.$refs.video.style.height = `${Math.max(width * .5625, height)}px`
    },
    toggleVideo(play){
      this.playVideo = play
      this.$emit(play ? 'play' : 'pause')
    }
  }
}
</script>

<style lang="scss">
.video-player{
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .video-wrapper{
    flex: 0 0 auto;
    //width: 177.778vh;
    //height: 56.25vw;
    //min-width: 100vw;
    //min-height: 100vh;
    pointer-events: none;
    position: relative;
  }
}
</style>
