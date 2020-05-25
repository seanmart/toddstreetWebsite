<template lang="html">
  <div class="video-player" v-mouse="handleMouse">
    <div class="video"/>
    <div class="button-container" ref="container">
      <div class="button" ref="button">
        <h3>{{status}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      status: 'Play'
    }
  },
  methods:{
    handleMouse(e){
      if (e.entering){
        this.$gsap.to(this.$refs.button,.2,{scale:1,opacity:1})
      } else if (e.active){
        this.$gsap.set(this.$refs.button,{x:e.x - 50,y: e.y - 50})
      } else if (e.leaving){
        this.$gsap.to(this.$refs.button,.2,{scale: 0,opacity: 0})
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
      background: #ddd;
    }

    .button-container{
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;

      .button{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: white;
        text-transform: uppercase;
        opacity: 0;
        transform:scale(0);
      }
    }
  }
</style>
