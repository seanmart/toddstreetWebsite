<template lang="html">
  <header id="top">
    <button ref="button" class="button" type="button" name="menu">
      <div class="line top"/>
      <div class="line bottom"/>
    </button>
    <div ref="logo" class="logo">
      <logo/>
    </div>
  </header>
</template>

<script>
import logo from '@/components/logo'
import {mapState} from 'vuex'
export default {
  components:{logo},
  computed: mapState(["nav", "ready"]),
  data(){
    return{
      showSide: false
    }
  },
  mounted(){

    window.addEventListener('resize', this.handleResize)

  },
  watch:{
    ready(x){
      this.handleResize()
    },
    nav(x){
      if (this.showSide) x = true
      this.toggleSide(x)
    },
    showSide(x){
      if (!x) x = this.nav
      this.toggleSide(x)
    }
  },
  methods:{
    handleResize(){
      this.showSide = window.innerWidth < 600
    },
    toggleSide(on){
      let speed = on ? .75 : .2
      this.$gsap.to(this.$refs.button, speed,{y: on ? 0 : '-100%', ease: on ? 'power3.out' : 'power3.in'})
      this.$gsap.to(this.$refs.logo, speed,{y: on ? 0 : '100%', ease: on ? 'power3.out' : 'power3.in'})
    }
  }
}
</script>

<style lang="scss">

  $sideWidth: 70px;

  #top{
    position: fixed;
    z-index: 10;
    height: 100vh;

    .button{
      transform: translateY(-100%);
      position: absolute;
      top: 0px;
      left: 0px;
      width: $sideWidth;
      height: $sideWidth;
      @include center;
      flex-direction: column;

      .line{
        flex: 0 0 2px;
        width: $sideWidth/2;
        background: $snow;
        margin: 3px 0px;
      }
    }

    .logo{
      transform: translateY(100%);
      position: absolute;
      bottom: 0px;
      left: 0px;
      height: 200px;
      width: $sideWidth;
      @include center;

      svg{
        transform: rotate(-90deg);
        flex: 0 0 150px;
        fill: $snow
      }
    }


  }
</style>
