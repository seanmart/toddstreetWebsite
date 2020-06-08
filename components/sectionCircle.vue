<template lang="html">
  <div class="section-circle">
    <div class="circle texture" ref="circle"/>
  </div>
</template>

<script>
export default {
  data:()=>({
    animation: null
  }),
  mounted(){
    this.animation = gsap.to(this.$refs.circle,1,{y:'-30vh', ease: 'none', paused: true})
  },
  methods:{
    handleScroll(e){
      this.animation.progress(e.percent)
    }
  }
}
</script>

<style lang="scss">
.section-circle{
  position: absolute;
  top: $desktop-section-space;
  right: -20%;
  z-index: -1;

  .circle{
    width: 60vw;
    height: 60vw;
    border-radius: 50%;
  }

  @media (max-width: $mobile){
    .circle{
      width: 110vw;
      height: 110vw;
      right: -40vw;
      transform: none !important;
    }
  }
}
</style>
