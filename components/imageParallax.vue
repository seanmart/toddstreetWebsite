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
    vScroll: {type: Object, default: ()=> ({})},
    gsap: {type: Object, default: ()=> ({})},
  },
  data(){
    return{
      animations:{}
    }
  },
  mounted(){
    let props = {...this.gsap, ease: 'linear', y:'50%'}

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
        ...this.vScroll,
        onScroll:this.onScrollEvent,
        onVisible:this.onVisibleEvent
      }
    }
  },
  methods:{
    onScrollEvent(e){
      if (this.vScroll.onScroll) this.vScroll.onScroll(e)
      this.animations.scroll.progress(e.percent)
    },
    onVisibleEvent(e){
      if (this.vScroll.onVisible) this.vScroll.onVisible(e)
      e
      ? this.animations.enter()
      : this.animations.reset()
    }
  }
}
</script>

<style lang="scss">
  .parallax-image-container{
    height: 100%;
    width: 100%;
    .parallax-image-wrapper{
      height: 100%;
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .parallax-image{
      position: absolute;
      top: -50%;
      left: 0px;
      width: 100%;
      height: 150%;
      background-size: cover;
    }
  }
</style>
