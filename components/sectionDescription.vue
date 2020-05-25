<template lang="html">
  <div class="section-description" ref="sd" v-element="[handleScroll,{offsetEnter: '20vh'}]">
    <p class="heading" v-if="heading" v-html="heading"/>
    <p class="body" v-if="body" v-html="body"/>
  </div>
</template>

<script>
export default {
  props:{
    heading: {type: String, default: null},
    body: {type: String, default: null}
  },
  data(){
    return{
      animate: null
    }
  },
  mounted(){
    this.animate = this.$gsap.from(this.$refs.sd.getElementsByTagName('p'),1,{opacity:0,yPercent: 100, ease: 'power4.out', paused: true})
  },
  methods:{
    handleScroll(e){
      if (e.entering && e.scroll.direction == 'down') this.animate.resume()
    }
  }
}
</script>

<style lang="scss">
  .section-description{

    .heading{
      @include body-big;
      font-weight: 500;
      margin-bottom: $v-space / 3;
    }
    .body{
      @include body-medium;
      font-weight: 300;

    }
  }
</style>
