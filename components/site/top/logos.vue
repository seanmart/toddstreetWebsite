<template lang="html">
  <div class="logos">
    <div class="top logo" v-scroll="topScroll">
      <icons icon="logo"/>
    </div>
    <div class="side logo" v-scroll="sideScroll">
      <icons icon="logo"/>
    </div>
  </div>
</template>

<script>
import icons from '@/components/icons'
export default {
  components:{icons},
  data(){
    return{
      show: false
    }
  },
  computed:{
    topScroll(){
      return{
        scroll:{min:800}
      }
    },
    sideScroll(){
      return{
        scroll:{min:800,duration: '100%y'}
      }
    }
  }
}
</script>

<style lang="scss">
header{
  .logo{
    position: fixed;
    z-index: 100;

    &.top{
      fill: $snow;
      top: $unit;
      left: $unit;
      svg{width: 250px;}
    }

    &.side{
      fill: $charcoal;
      top: 100%;
      left: $unit / 4;
      width: $unit / 2;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      box-sizing: content-box;
      padding-top: 120px;
      padding-bottom: $unit / 2;

      svg{
        flex: 0 0 auto;
        width: 150px;
        transform: rotate(-90deg)
      }
    }
  }
  @media (max-width:$tablet){
    &.top{
      top: $unit-tablet;
      left: $unit-tablet;
    }
    &.side{
      top: $unit-tablet;
      left: $unit-tablet;
    }
  }
  @media (max-width: $mobile){

  }
}
</style>
