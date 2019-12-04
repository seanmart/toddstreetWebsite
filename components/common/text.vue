<template lang="html">
  <div class="text" :class="align" v-if="text">
    <div class="text-line" v-for="(item,i) in text" v-html="item" ref="line"/>
  </div>
</template>

<script>
export default {
  props:{
    text: {type: Array, default: null},
    play: Boolean,
    align: {type: String, default: 'left'},
  },
  data(){
    return{
      textAnimation: null
    }
  },
  mounted(){
    if (!this.text || this.text.length < 1) return
    this.textAnimation = this.$gsap.to(this.$refs.line,1,{y:0,opacity: 1,stagger:.15}).pause()
    this.play && this.textAnimation.play()
  },
  watch:{
    play(play){
      play ? this.textAnimation.play() : this.textAnimation.reverse()
    }
  },
  computed:{
    speed(){
      return this.align === 'left' ? -.5 : .5
    }
  }
}
</script>

<style lang="scss">
  .text{
    display: inline-block;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .text.right{
    text-align: right;
  }

  .text-line{
    transform: translateY(100%);
    opacity: 0;
    white-space: nowrap;
    display: block;
  }


</style>
