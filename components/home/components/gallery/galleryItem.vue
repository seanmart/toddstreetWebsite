<template lang="html">
  <div class="gallery-item">
    <div class="content" ref="content">
      <div class="image-container" v-scroll="scrollProps">
        <div class="image" ref="image" :style="{backgroundImage: `url(${image})`}"/>
      </div>
    </div>
  </div>
</template>

<script>
import vars from '@/assets/scss/variables.scss'
export default {
  props:{
    image: {type:String,default: null},
    index: {type: Number, default: 0},
  },
  data(){
    return{
      animation: null
    }
  },
  mounted(){
    this.animation = this.$gsap.timeline({paused: true})
    this.animation.fromTo(this.$refs.image,1,{y:'-10%'},{y:'10%', ease: 'linear'},0)
    this.animation.fromTo(this.$refs.content,.3,{y:'100px'},{y:'0%', ease: 'power2.out'},0)
  },
  computed:{
    scrollProps(){
      let count = this.index > 8 ? this.index % 8 : this.index
      let props = {}

      props.onScroll = (e)=> this.animation.progress(e.percent)

      if ([2,3,5,8].indexOf(count) > -1) props.transform = {min: vars.tablet, y: 2}

      return props
    }
  }
}
</script>

<style lang="scss">
.gallery-item{
  align-self: flex-end;
  flex: 0 0 auto;
  width: 33.333%;
  padding: $unit / 10;

  .content{
    padding-bottom: 130%;
    width: 100%;
    position: relative;

    .image-container{
      overflow: hidden;
      position: absolute;
      top: 0px;
      height: 100%;
      left: 0px;
      right: 0px;

      .image{
        position: absolute;
        top: -10%;
        left: 0px;
        right: 0px;
        bottom: -10%;
        background-size: cover;
        background-position: center center;
      }

    }
  }

  @media (min-width:$tablet){
    &:nth-child(8n + 1){
      width: 66.666%;
    }

    &:nth-child(8n + 2),
    &:nth-child(8n + 3),
    &:nth-child(8n + 5),
    &:nth-child(8n + 8){
      .image-container{
        top: 70%;
      }
    }

    &:nth-child(8n + 4){
      margin-right: 33.333%;
    }

    &:nth-child(8n + 6){
      width: 66.666%;
    }

    &:nth-child(8n + 7){
      margin-left: 33.333%;
    }
  }


  @media (max-width:$tablet) and (min-width: $mobile){
    padding: $unit-tablet / 10;
    width: 50%;

    &:nth-child(even){
      .image-container{
        top: 50%;
      }
    }


  }
  @media (max-width: $mobile){
    padding: 0px;
    width: 100%;
  }


}
</style>
