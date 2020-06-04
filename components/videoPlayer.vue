<template lang="html">
  <div class="video-player" :class="{play}" @click="play=!play" v-mouse="handleMouse">

    <div class="video-container" v-if="videoId" v-scroll="handleScroll">
      <div :id="videoId" :class="`video wistia_embed wistia_async_${videoId}`"/>
    </div>

    <button type="button" name="play" ref="button" >
      <div class="content">
        <div class="text">
          <span class="button--rg">play</span>
          <span class="button--rg">pause</span>
        </div>
        <div class="circle" ref="circle"/>
      </div>
    </button>

  </div>
</template>

<script>
export default {
  props:{
    videoId: {type: String, default: null}
  },
  data:()=>({
    active: false,
    play: false,
    timeout: null,
    hidden: false,
    wistia: null
  }),
  watch:{
    play(play){
      clearTimeout(this.timeout)
      if (play){
        this.hidden = true
        this.wistia.play()
      }
      if (!play){
        this.hidden = false
        this.wistia.pause()
      }
    },
    hidden(hidden){
      clearTimeout(this.timeout)
      if (!hidden) this.showButton()
      if (hidden) this.timeout = setTimeout(this.hideButton,300)
      if (!hidden && this.play) this.hidden = true
    }
  },
  mounted(){
    if (this.videoId) this.setVideo()
  },
  methods:{
    showButton(){
      gsap.to(this.$refs.button,.25,{opacity:1, scale: 1})
    },
    hideButton(){
      gsap.to(this.$refs.button,.25,{opacity:0,scale:0})
    },
    handleScroll(e){
      if (e.leave) this.play = false
    },
    handleMouse(e){
      if (e.enter){
        this.showButton()
      }
      if (e.leave){
        this.hideButton()
      }
      if (e.active){
        if (this.play) this.hidden = false
        gsap.set(this.$refs.button,{x:e.x - 50,y:e.y - 50})
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
  background: $blue;

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

  button{
    z-index: 1;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: scale(0);
    opacity: 0;

    .content{
      position: relative;
      width: 100px;
      height: 100px;
    }

    .text, .circle{
      position: absolute;
      height: 100%;
      width: 100%;
    }

    .text{
      overflow: hidden;
    }

    span{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform .25s;
    }

    .circle{
      z-index: -1;
      border-radius: 50%;
      background: white;
      transition: transform .25s
    }

  }
  &.play{
    .video{
      background: black;
    }
    button span{
      transform: translateY(-100%);
    }
  }
}

.touch{
  .video-player{
    button{
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      opacity: 1;

      @media (max-width: $mobile){
        .content{
          width: 75px;
          height: 75px;
        }
      }
    }
  }
}
</style>
