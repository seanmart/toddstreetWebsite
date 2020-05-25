<template lang="html">
  <div class="big-circle" ref="bc" v-element="[handleScroll,{mobile: true}]"/>
</template>

<script>
export default {
  data(){
    return{
      animate:null
    }
  },
  mounted(){
    this.animate = this.$gsap.to(this.$refs.bc,1,{y:-200,paused: true})
  },
  methods:{
    handleScroll(e){
      this.animate.progress(e.percent)
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
