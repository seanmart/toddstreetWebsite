<template lang="html">
  <div id="splash" ref="splash">
    <div class="logo" ref="logo">
      <icons icon="logo"/>
    </div>
  </div>
</template>

<script>
import icons from '@/components/icons'
export default {
  components:{icons},
  mounted(){
    this.$gsap.fromTo(this.$refs.logo,
      1,{opacity:0,y:'100%'},{opacity:1,y:'0%',delay: 1, onComplete:this.initSite})
  },
  methods:{
    initSite(){
      this.$emit('ready')
      this.$gsap.to(this.$refs.splash,1,{opacity: 0, delay: 1, onComplete: ()=>{
        this.$refs.splash.style.display = 'none'
      }})
    }
  }
}
</script>

<style lang="scss">
#splash{
  background: $midnight;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo{
    display: inline-block;
    width: 300px;
    fill: $snow;
    svg{
      width: 100%;
    }
  }
}
</style>
