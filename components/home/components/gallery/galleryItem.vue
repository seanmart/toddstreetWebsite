<template lang="html">
  <div class="gallery-item">
    <div class="content" :class="{show}">
      <div class="image-container" v-scroll="itemScroll">
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
    hide: [String,Number,Boolean]
  },
  data(){
    return{
      show: false,
      animation: null
    }
  },
  mounted(){
    this.animation = this.$gsap.fromTo(this.$refs.image,1,{y:'-10%'},{y:'10%', ease: 'linear'}).pause()
  },
  computed:{
    itemScroll(){
      let count = this.index > 8 ? this.index % 8 : this.index
      let parallax = [2,3,5,8].indexOf(count) > -1 ? 2 : null

      let onScroll = (e)=> {
        this.show = true
        this.animation && this.animation.progress(e.percent)
      }

      let onResize = ()=>{
        return {y:window.innerWidth < parseInt(vars.tablet) ? null : parallax }
      }

      return {y: parallax, onScroll, onResize}
    }
  }
}
</script>

<style lang="scss">
.gallery-item{
  align-self: flex-end;
  flex: 0 0 auto;
  width: 33.333%;
  padding: 1vw;

  .content{
    padding-bottom: 130%;
    width: 100%;
    position: relative;
    transform: translateY(50%);
    transition: transform 1s;

    &.show{
      transform: translateY(0px);
    }

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


  @media (max-width:$tablet) and (min-width: $mobile + 1){
    width: 50%;
    transform: translateY(0px);

    &:nth-child(even){
      .image-container{
        top: 50%;
      }
    }


  }
  @media (max-width: $mobile){
    width: 100%;
  }


}
</style>
