<template lang="html">
  <div ref="container" class="parallax-image-container">
    <div class="parallax-image-wrapper" v-scroll="vScrollProps">
      <div ref="image" class="parallax-image" :style="styles"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    image: {type: String, default: null},
    innerParallax: {type: Boolean, default: true},
    parallax:{type: Number, default: null},
    onScroll: {type:Function, default: null},
    rotate:{type: Number, default: null},
    scale:{type: Number, default: null},
  },
  data(){
    return{
      animations:{}
    }
  },
  mounted(){
    let props = {ease: 'linear'}
    if (this.innerParallax) props.y = '25%'
    if (this.rotate) props.rotation = this.rotate
    if (this.scale) props.scale = this.scale

    this.animations.scroll = this.$gsap.to(this.$refs.image,1,props).pause()
    this.animations.reset = ()=> this.$gsap.set(this.$refs.image, {scale: 1.1})
    this.animations.enter = ()=> this.$gsap.to(this.$refs.image,.75,{scale: 1})
    this.animations.reset()
  },
  computed:{
    styles(){
      return this.image ? {backgroundImage: `url(${this.image})`} : {}
    },
    vScrollProps(){
      return{
        parallax:[
          {min: 600, ySpeed:this.parallax}
        ],
        onScroll:this.onScrollEvent,
        onChange:this.onChangeEvent
      }
    }
  },
  methods:{
    onScrollEvent(e){
      if (this.onScroll) this.onScroll(e)
      this.animations.scroll.progress(e.percent)
    },
    onChangeEvent(e){
      e.visible
      ? this.animations.enter()
      : this.animations.reset()
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
