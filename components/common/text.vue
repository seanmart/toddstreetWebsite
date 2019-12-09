<template lang="html">
  <div class="text-container" v-if="text">
    <div class="text-line" v-for="(item, i) in text" :key="i">
      <component :is="tag" v-html="item" ref="line" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: Array, default: null },
    play: Boolean,
    tag: {type:String, default: 'p'},
    speed: {type: Number, default: .5},
    stagger: {type: Number, default: .1}
  },
  data(){
    return{
      textAnimation: null
    }
  },
  mounted(){
    this.textAnimation = this.$gsap.fromTo(this.$refs.line,this.speed,{y:'100%'},{y:'0%',stagger: this.stagger}).pause()
    if (this.play) this.textAnimation.play()
  },
  watch:{
    play(play){
      play && this.textAnimation.play()
    }
  }
};
</script>

<style lang="scss">

.text-line {
  font-size: inherit;
  color: inherit;
  white-space: nowrap;
  display: block;
  overflow: hidden;
}
</style>
