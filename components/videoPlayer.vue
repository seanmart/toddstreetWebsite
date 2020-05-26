<template lang="html">
  <div class="video-player">
    <div class="video"/>
    <div class="mouse-zone" v-mouse="handleMouse"/>
    <button type="button" name="play" ref="button" >Play</button>
  </div>
</template>

<script>
export default {
  data:()=>({
    active: false
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
        this.$gsap.to(this.$refs.button,.15,{scale: .9, yoyo: true, repeat: 1})
      }
    }
  }
}
</script>

<style lang="scss">
.video-player{
  position: relative;
  .video{
    width: 100%;
    padding-bottom: 56.25%;
    background: #1E0FC7;
  }

  .mouse-zone{
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    cursor: none;
  }

  button{
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 0;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0);
    opacity: 0;
    @include headerFont;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
