<template lang="html">
  <div class="work-title" v-if="title">
    <div v-for="(line,i) in lines" :key="i" class="work-title-line">
      <h1 ref="title">{{line}}</h1>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    title: {type: String, default: null}
  },
  mounted(){
    this.$gsap.set(this.$refs.title,{yPercent: 100})
    if (this.ready) this.onReady()
  },
  watch:{
    ready(){
      this.onReady()
    }
  },
  computed:{
    ...mapState(['ready']),
    lines(){
      return this.title.split(' ')
    }
  },
  methods:{
    onReady(){
      this.$gsap.to(this.$refs.title,.75,{yPercent: 0, stagger: .2, delay: .5,ease: 'power2.out'})
    }
  }
}
</script>

<style lang="scss">
  .work-title{
    @include font('header big');

    .work-title-line{
      overflow: hidden;
      margin-top: -1.5vw;
    }
  }
</style>
