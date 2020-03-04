<template lang="html">
  <header>
    <div class="logos">
      <div class="top logo" v-scroll="{scroll: true, padding: '100%y'}">
        <icons icon="logo"/>
      </div>
      <div class="side logo" v-scroll="{scroll: true, duration:'100%y'}" ref="sideLogo">
        <icons icon="logo"/>
      </div>
    </div>
  </header>
</template>

<script>
import icons from '@/components/icons'
export default {
  components:{icons},
  data(){
    return{
      sideLogoAnimation: null
    }
  },
  mounted(){
    this.sideLogoAnimation = this.$gsap.to(this.$refs.sideLogo,1,{y: '-100%' }).pause()
  },
  methods:{
    onScroll(e){
      this.sideLogoAnimation.progress(e.percent)
    }
  }

}
</script>

<style lang="scss">
header{
  .logo{
    position: fixed;
    z-index: 100;
    fill: $midnight;

    &.top{
      top: $site-padding;
      left: $site-padding;
      svg{width: 18vw}
    }

    &.side{
      left: $site-padding / 4;
      top: 100%;
      width: $site-padding / 2;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      box-sizing: content-box;
      padding-top: 120px;
      padding-bottom: $site-padding / 2;

      svg{
        flex: 0 0 auto;
        width: 150px;
        transform: rotate(-90deg)
      }
    }
  }
  @media (max-width:$tablet){
    .logo{
      &.top{
        top: $site-padding-tablet;
        left: $site-padding-tablet;
      }
      &.side{
        height: 125px;
        left: $site-padding-tablet / 4;
        width: $site-padding-tablet / 2;
        padding-bottom: $site-padding-tablet / 2;

        svg{
          width: 125px;
        }
      }
    }
  }
  @media (max-width: $mobile){
    .logo{
      &.side{
        display: none;
      }
    }
  }
}
</style>
