<template lang="html">
  <div class="video-player">
    <div class="video" v-mouse="handleMouse"/>
    <button type="button" name="play" ref="button" >
      <div class="content">
        <transition name="button">
          <span class="button--rg" :key="status">{{status}}</span>
        </transition>
        <div class="circle" ref="circle"/>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  data:()=>({
    active: false,
    status: 'play'
  }),
  methods:{
    handleMouse(e){

      if (e.entering){
        this.$gsap.to(this.$refs.button,.25,{scale: 1,opacity:1})
      }
      if (e.leaving){
        this.$gsap.to(this.$refs.button,.25,{scale: 0,opacity:0})
      }
      if (e.active){
        this.$gsap.set(this.$refs.button,{x:e.mouse.x - 50,y:e.mouse.y - 50})
      }
      if (e.click){
        this.status = this.status == 'play' ? 'pause' : 'play'
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
    z-index: 1;
  }

  button{
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

    span, .circle{
      position: absolute;
      height: 100%;
      width: 100%;
    }

    span{
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }

    .circle{
      border-radius: 50%;
      background: white;
    }

    .button-enter-active, .button-leave-active {
      transition: .25s
    }
    .button-enter{
      transform: translateY(-30%);
      opacity: 0;
    }
    .button-leave-active{
      transform: translateY(30%);
      opacity: 0;
    }
  }
}
</style>
