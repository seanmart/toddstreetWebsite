<template lang="html">
  <div class="gallery-item">
    <div class="content" :class="{show}">
      <div class="image-container" v-scroll="scrollProps">
        <div class="image" ref="image" :style="{backgroundImage: `url(${image})`}"/>
      </div>
    </div>
  </div>
</template>

<script>
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
  watch:{
    hide(){
      this.show = false
    }
  },
  computed:{
    scrollProps(){
      let count = this.index > 8 ? this.index % 8 : this.index
      let props = {}

      props.onEnterTop = ()=> this.show = true
      props.onScroll = (e)=> this.animation.progress(e.percent)

      if ([2,3,5,8].indexOf(count) > -1) props.transform = {y: 2}

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
  padding: $unit /10;

  .content{
    padding-bottom: 130%;
    position: relative;
    transform: translateY(50%);
    transition: transform 1s;

    &.show{
      transform: translateY(0);
    }

    .image-container{
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      overflow: hidden;

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

  &:nth-child(8n + 1){
    width: 66.666%;
  }

  &:nth-child(8n + 2),
  &:nth-child(8n + 3),
  &:nth-child(8n + 5),
  &:nth-child(8n + 8){
    .content{
      padding-bottom: 20%;
      .image-container{
        bottom: -600%;
      }
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

  @media (max-width:$tablet){
    padding: $unit-tablet / 4;
  }
  @media (max-width: $mobile){
    padding: $unit-mobile / 4;
  }


}
</style>
