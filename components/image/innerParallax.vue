<template lang="html">
  <div class="parallax-image-container" v-scroll="imageProps">
    <div ref="image" class="parallax-image" :style="background"/>
  </div>
</template>

<script>
export default {
  props:{
    image: {type: String, default: ''},
    vScroll: {type: Object, default: ()=>({})}
  },
  data(){
    return{
      animation: null
    }
  },
  mounted(){
    this.animation = this.$gsap.to(this.$refs.image,1,{y: '30%', ease: 'linear'}).pause()
  },
  computed:{
    background(){
      if (!this.image || this.image == '') return {}
      return { backgroundImage:`url(${this.image})`}
    },
    imageProps(){
      let props = {}

      props.onScroll = (e) => {
        this.animation.progress(e.percent)
        if (this.vScroll.onScroll) this.vScroll.onScroll(e)
      }

      Object.keys(this.vScroll).forEach(key => {
        if (key !== 'onScroll') props[key] = this.vScroll[key]
      })

      return props
    }
  }
}
</script>

<style lang="scss">
  .parallax-image-container{
    position: relative;
    overflow: hidden;

    .parallax-image{
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      top: -30%;
      background-size: cover;
      background-position: center center;
      //background-color: $midnight;
    }
  }
</style>
