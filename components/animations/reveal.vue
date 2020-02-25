<template lang="html">
  <div class="reveal" :class="[direction,{inline}]" ref="reveal">
      <slot/>
  </div>
</template>

<script>
export default {
  props:{
    top: Boolean,
    left: Boolean,
    right: Boolean,
    show: Boolean,
    speed: {type: Number, default: .75},
    delay: {type: Number, default: 0},
    progress:{type: Number, default: 0},
    inline: Boolean
  },
  data(){
    return{
      animation: null
    }
  },
  mounted(){
    let el = this.$refs.reveal.childNodes[0]
    this.animation = this.$gsap.to(el, this.speed, {x: 0, y: 0, delay: this.delay, ease: 'Power3.out'}).pause()
    if (this.show) this.animation.play()
  },
  watch:{
    show(show){
      show ? this.animation.play() : this.animation.reverse()
    },
    progress(p){
      this.animation.progress(Math.min(Math.max(p,0),1))
    }
  },
  computed:{
    direction(){
      return this.top ? 'reveal-top' : this.left ? 'reveal-left' : this.right ? 'reveal-right' : 'reveal-bottom'
    }
  }
}
</script>

<style lang="scss">
.reveal{
  overflow: hidden;
  &.inline{display: inline-block;}
  &.reveal-top > *{transform: translateY(-100%);}
  &.reveal-bottom > *{transform: translateY(100%);}
  &.reveal-left > *{transform: translateX(-100%);}
  &.reveal-right > *{transform: translateX(100%);}
}
</style>
