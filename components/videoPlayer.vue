<template lang="html">
  <div class="video-player" :class="{play}" @click="play=!play">

    <div class="video-container" v-if="videoId" v-scroll="handleScroll">
      <div :id="videoId" :class="`video wistia_embed wistia_async_${videoId}`"/>
    </div>

    <btn-container @active="handleActive">
      <btn class="btn" :hide="hide">
        <div class="content">
          <span class="play">Play</span>
          <span class="pause">Pause</span>
        </div>
      </btn>
    </btn-container>

  </div>
</template>

<script>
import btnContainer from '@/components/button/container'
import btn from '@/components/button'

export default {
  components:{btn,btnContainer},
  props:{
    videoId: {type: String, default: null}
  },
  data:()=>({
    active: false,
    play: false,
    timeout: null,
    wistia: null,
    hide: false
  }),
  watch:{
    play(play){
      clearTimeout(this.timeout)
      if (play) {
        this.timeout = setTimeout(()=> this.hide = true,700)
        this.wistia.play()
      }
      if (!play) {
        this.hide = false
        this.wistia.pause()
      }
    },
  },
  mounted(){
    if (this.videoId) this.setVideo()
  },
  methods:{
    handleScroll(e){
      if (e.leave) this.play = false
    },
    handleActive(active){
      clearTimeout(this.timeout)
      if (active) this.hide = false
      if (!this.active && this.play){
        this.timeout = setTimeout(()=> this.hide = true,700)
      }
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
  overflow: hidden;
  padding-bottom: 56.25%;

  .video-container{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    transition: background .25s;

    .video{
      position: relative;
      height: 100%;
      width: 100%;
    }
  }

  .btn-container{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    .content,
    span,
    .btn{
      height: 100px;
      width: 100px;
    }

    .content{
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    span{
      flex: 0 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform .25s;
    }
  }

  &.play{
    .video{
      background: black;
    }
    span{
      transform: translateY(-100%);
    }
  }
}

.touch{

}
</style>
