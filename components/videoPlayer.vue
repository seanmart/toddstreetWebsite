<template lang="html">
  <div class="video-player" v-mouse="handleMouse" :class="{play}" @click=" play=!play ">
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
    hidden: false,
    timeout: null
  }),
  watch:{
    play(play){
      if (play) this.hideButton()
      if (!play) this.showButton()
    }
  },
  methods:{
    showButton(){
      this.hidden = false
      clearTimeout(this.timeout)
      this.$gsap.to(this.$refs.button,.25,{opacity:1})
    },
    hideButton(){
      clearTimeout(this.timeout)
      this.timeout = setTimeout(()=> {
        this.$gsap.to(this.$refs.button,.25,{opacity:0})
        this.timeout = null
        this.hidden = true
      },500)
    },
    handleMouse(e){

      if (e.entering){
        this.$gsap.to(this.$refs.button,.25,{scale: 1,opacity:1})
      }
      if (e.leaving){
        this.$gsap.to(this.$refs.button,.25,{scale: 0,opacity:0})
      }
      if (e.active){
        if (this.play) {
          if (this.hidden) this.showButton()
          this.hideButton()
        }
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
  background: #1E0FC7;

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

    &:active{
      .circle{
        transform: scale(1.2)
      }
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

.mobile{
  .video-player{
    button{
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: transform .25s, opacity .25s;
      opacity: 1;
    }
  }
}
</style>
