<template lang="html">
  <div id="splash" ref="splash">
    <div class="content">
      <div class="logo" ref="logo">
        <icons icon="logo"/>
      </div>
    </div>
  </div>
</template>

<script>
import icons from '@/components/icons'
export default {
  components:{icons},
  mounted(){
    let tl = this.$gsap.timeline({onComplete:()=>this.$emit('ready'),delay: 1})
    tl.fromTo(this.$refs.logo,1,{opacity:0,yPercent: 100},{opacity:1,yPercent: 0,ease: 'power2.out'})
    tl.to(this.$refs.splash,1,{height: 0, ease: 'power2.in'},'=-.5')
  }
}
</script>

<style lang="scss">
#splash{
  background: $midnight;
  fill: $snow;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;

  .content{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo{
      width: 50vw;
      svg{
        width: 100%;
        fill: inherit;
      }
    }
  }
}
</style>
