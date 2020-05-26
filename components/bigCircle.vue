<template lang="html">
  <div class="big-circle" ref="bc" v-element="handleScroll"/>
</template>

<script>
export default {
  data(){
    return{
      animate:null,
      scroll:null
    }
  },
  mounted(){
    this.animate = this.$gsap.from(this.$refs.bc,1,{opacity:0,scale:.5, paused: true})
    this.scroll = this.$gsap.to(this.$refs.bc,1,{y:-300,paused: true})
  },
  methods:{
    handleScroll(e){
      e.entering && this.animate.resume()
      this.scroll.progress(e.percent)
    }
  }
}
</script>

<style lang="scss">
  .big-circle{
    width: 70vw;
    height: 70vw;
    background: #eee;
    border-radius: 50%;

    @media (max-width: $mobile){
      width: 600px;
      height: 600px;
    }
  }
</style>
