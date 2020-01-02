<template lang="html">
  <div class="parallax-image-container">
    <div class="parallax-image-wrapper" v-scroll="scrollProps">
      <div ref="image" class="parallax-image" :style="styles"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    image: {type: String, default: null},
    parallax:{type: Number, default: null},
    onScroll: {type:Function, default: null}
  },
  data(){
    return{
      innerParallax: null
    }
  },
  mounted(){
    this.innerParallax = this.$gsap.to(this.$refs.image,1,{y:'25%', ease: 'linear'}).pause()
  },
  computed:{
    scrollProps(){
      let props = {}
      props.onScroll = this.onScrollEvent
      props.parallax = {
        speed: this.parallax,
        min: 600
      }
      return props
    },
    styles(){
      return this.image ? {backgroundImage: `url(${this.image})`} : {}
    }
  },
  methods:{
    onScrollEvent(e){
      if (this.onScroll) this.onScroll(e)
      this.innerParallax.progress(e.percent)
    }
  }
}
</script>

<style lang="scss">
  .parallax-image-container{
    .parallax-image-wrapper{
      height: 100%;
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .parallax-image{
      position: absolute;
      top: -25%;
      left: 0px;
      width: 100%;
      height: 125%;
      background-size: cover;
    }
  }
</style>
