<template lang="html">
  <div class="video-player">
    <div class="video-wrapper" v-scroll="{onEnter, onLeave}">
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
  },
  watch:{
    play(play){
      this.toggleVideo(play)
    }
  },
  methods:{
    toggleVideo(play){
      this.playVideo = play
      this.$emit(play ? 'play' : 'pause')
    },
    onEnter(){
      this.toggleVideo(true)
    },
    onLeave(){
      this.toggleVideo(false)
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
    width: 177.778vh;
    height: 56.25vw;
    min-width: 100vw;
    min-height: 100vh;
    pointer-events: none;
    position: relative;
  }
}
</style>
