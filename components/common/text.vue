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
    tag: {type:String, default: 'p'}
  },
  data(){
    return{
      textAnimation: null
    }
  },
  mounted(){
    this.textAnimation = this.$gsap.fromTo(this.$refs.line,1,{y:'100%'},{y:'0%',stagger: .15}).pause()
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
.text {
  display: inline-block;
  position: relative;
  z-index: 1;
}

.text.right {
  text-align: right;
}

.text-line {
  white-space: nowrap;
  display: block;
  overflow: hidden;
}
</style>
