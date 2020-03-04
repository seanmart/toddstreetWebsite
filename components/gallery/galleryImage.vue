<template lang="html">
  <div class="gallery-image">
    <div class="height-container">
      <div class="image-content">
        <div class="image-container" v-scroll="imageProps">
          <div ref="image" class="image" :style="backgroundImage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    parallax:{type:Number, default: 0},
    image: {type: String, default: null}
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
    backgroundImage(){
      if (!this.image || this.image == '') return {}
      return { backgroundImage:`url(${this.image})`}
    },
    imageProps(){
      let props = {onScroll: this.onScroll}
      if (this.parallax) props.y = this.parallax
      return props
    }
  },
  methods:{
    onScroll(e){
      this.animation.progress(e.percent)
    }
  }
}
</script>

<style lang="scss">
  .gallery-image{

    .height-container{
      padding-bottom: 130%;
      position: relative;
    }

    .image-content{
      position: absolute;
      width: 100%;
    }

    .image-container{
      height: 100%;
      width: 100%;
      overflow: hidden;
      padding-bottom: 130%;
      position: relative;
    }

    .image{
      position: absolute;
      bottom: 0px;
      width:100%;
      height: 130%;
      background-size: cover;
      background-position: center;
      background-color: $midnight;
    }
  }
</style>
