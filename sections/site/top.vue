<template lang="html">
  <div id="nav">

    <button class="button">
      <div class="line top"/>
      <div class="line bottom"/>
    </button>

    <div class="logo top">
      <text-reveal :play="ready" v-scroll:section="{onVisible: toggleLogo}">
        <nuxt-link to="/" class="reveal-top">
          <icons icon="logo"/>
        </nuxt-link>
      </text-reveal>
    </div>

    <div class="logo side" :class="{show: showSideLogo}">
      <icons icon="logo"/>
    </div>

    <div class="logo mobile">
      <icons icon="logo"/>
    </div>

    <div class="menu">
      menu
    </div>
  </div>

</template>

<script>
import icons from '@/components/icons'
import textReveal from '@/components/textReveal'
import {mapState} from 'vuex'
export default {
  components:{icons,textReveal},
  data(){
    return{
      showSideLogo: false,
    }
  },
  computed:{
    ...mapState(['ready'])
  },
  methods:{
    toggleLogo(visible){
      this.showSideLogo = !visible
    }
  }
}
</script>

<style lang="scss">
  #nav{
    position: absolute;
    z-index: 100;

    .logo{
      fill: $snow;
      &.top,
      &.mobile{
        position: absolute;
        top: 0px;
        left: 0px;
        @include padding(true,fase,false,true);
        a{
          display: block;
          fill: inherit;
        };
        svg{
          width: $unit * 2;
          min-width: 100px;
        }
      }
      &.side{
        @include sideWidth;
        transform: translateY(100%);
        position: fixed;
        bottom: 0px;
        left: 0px;
        transition: transform .5s;
        height: $unit * 1.75;
        padding-bottom: $unit / 2;
        box-sizing: content-box;
        display: flex;
        justify-content: center;
        align-items: center;
        svg{
          width: $unit * 1.75;
          transform: rotate(-90deg);
          flex: 0 0 auto;
        }
        &.show{
          transform: translateY(0%);
        }
      }
      &.mobile{
        position: fixed;
        display: none;
      }
    }
    .button{
      position: fixed;
      top: 0px;
      right: 0px;
      box-sizing: content-box;
      @include padding();
      .line{
        width: 40px;
        height: 2px;
        margin: 8px 0px;
        background: $snow;
        &.top{margin-top: 0px;}
        &.bottom{margin-bottom: 0px;}
      }
    }
    .menu{
      position: fixed;
      top: 0px;
      left: 0px;
      transform: translateX(-100%);
    }

    @media (max-width: $mobile){
      .logo{
        &.top{display: none;}
        &.side{display: none;}
        &.mobile{display: block;}
      }
    }
  }
</style>
