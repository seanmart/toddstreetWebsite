<template lang="html">
  <div class="parallax-image-container">
    <div class="parallax-inner-container">
      <div
      v-if="image"
      data-scroll
      data-scroll-speed="-1.5"
      class="parallax-image"
      :style="backgroundImage"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    image: {type: String, default: null}
  },
  computed:{
    backgroundImage(){
      if (!this.image) return {}
      return {backgroundImage:`url(${this.image})`}
    }
  }
}
</script>

<style lang="scss">
  .parallax-image-container{
    overflow: hidden;
    .parallax-inner-container{
      position: relative;
      height: 100%;
      width: 100%;
    }
    .parallax-image{
      position: absolute;
      width: 100%;
      left: 0px;
      top: -25%;
      bottom: -25%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
</style>
