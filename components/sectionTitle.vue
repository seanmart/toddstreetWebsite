<template lang="html">
  <div class="section-title" ref="st" v-enter:custom="animation">
    <split textClass="header--bg reveal" :text="title" tag="h1"/>
    <hr ref="rule"/>
  </div>
</template>

<script>
export default {
  props:{
    title: {type:String,default:''}
  },
  methods:{
    animation(){
      let wordEls = this.$refs.st.querySelectorAll('h1')

      let tl = gsap.timeline({paused: true})
      tl.from(this.$refs.rule,1,{scaleY:0, ease: 'power4.out', clearProps: 'all'},0)
      tl.from(wordEls,1,{yPercent:100, ease: 'power4.out', stagger: .07, clearProps:'all'},.3)

      return tl
    }
  }
}
</script>

<style lang="scss">
.section-title{
  position: relative;
  padding-left: $col + $gutter;
  margin-bottom: 50px;

  hr{
    background: $blue;
    transform-origin: bottom;
    border: none;
    position: absolute;
    width: $gutter;
    margin: 0px;
    top: 2px;
    bottom: 18px;
    left: 0px;
  }

  .word{
    overflow: hidden;
  }

  @media (min-width: $widescreen){
    hr{
      top: 2px;
      bottom: 19px;
    }
  }

  @media (max-width: $tablet){
    hr{
      top: 2px;
      bottom: 18px;
    }
  }

  @media (max-width: $mobile){
    hr{
      top: 1px;
      bottom: 13px;
    }
  }

}
</style>
