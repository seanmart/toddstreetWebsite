<template lang="html">
  <div class="video-player" :class="{play}" @click="play=!play" v-mouse="handleMouse">

    <div class="video"/>

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
  data:()=>({
    active: false,
    play: false,
    timeout: null,
    hidden: false,
  }),
  watch:{
    play(play){
      clearTimeout(this.timeout)
      if (play) this.hidden = true
      if (!play) this.hidden = false
    },
    hidden(hidden){
      clearTimeout(this.timeout)
      if (!hidden) this.showButton()
      if (hidden) this.timeout = setTimeout(this.hideButton,300)
      if (!hidden && this.play) this.hidden = true
    }
  },
  methods:{
    showButton(){
      this.$gsap.to(this.$refs.button,.25,{opacity:1, scale: 1})
    },
    hideButton(){
      this.$gsap.to(this.$refs.button,.25,{opacity:0,scale:0})
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
        this.$gsap.set(this.$refs.button,{x:e.x - 50,y:e.y - 50})
      }
    }
  }
}
</script>

<style lang="scss">
.video-player{
  position: relative;
  overflow: hidden;
  padding-bottom: 56.25%;
  background: $blue;

  .video{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    transition: background .25s;
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
