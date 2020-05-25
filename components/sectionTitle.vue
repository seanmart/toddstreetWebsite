<template lang="html">
  <div class="section-title" ref="st" :class="{right}" v-element="[handleScroll,{offsetEnter: '10vh'}]">
    <div class="bar"/>
    <split-text :right="right" :text="text"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    text: String,
    right: Boolean,
    bar: Boolean,
  },
  mounted(){
    this.animate = this.$gsap.timeline({paused: true})
    this.animate.from(this.$refs.st,2,{yPercent: 100,ease: 'power4.out'},0)
    this.animate.from(this.$refs.st.getElementsByTagName('span'),1,{yPercent: 140, stagger:.05, ease: 'power4.out'},0)
    this.animate.from(this.$refs.st.querySelector('.bar'),1,{scaleY: 0, ease: 'power4.out'},.4)
  },
  data(){
    return{
      animate: null
    }
  },
  methods:{
    handleScroll(e){
      if (e.entering && e.scroll.direction == 'down' && this.animate) this.animate.resume()
    }
  }
}
</script>

<style lang="scss">
.section-title{
  position: relative;
  padding-left: $col2;
  text-align: left;
  margin-bottom: $v-space;

  .bar{
    width: 13px;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 17px;
    background: #002E60;
    transform-origin: bottom;
  }

  .word{
    overflow: hidden;
    span{
      @include title;
    }
  }

  &.right{
    padding-left: 0px;
    padding-right: $col2;
    margin-left: auto;
    text-align: right;

    .bar{
      left: auto;
      right: 0px;
    }
  }

  @media (max-width: $mobile){
    .bar{
      width: 10px;
      bottom: 3.5vw;
    }
  }
}
</style>
