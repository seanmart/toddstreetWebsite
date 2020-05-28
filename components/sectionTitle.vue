<template lang="html">
  <div class="section-title" ref="st">
    <split textClass="header--bg reveal" :text="title" tag="h1"/>
    <hr ref="rule"/>
  </div>
</template>

<script>
export default {
  props:{
    title: {type:String,default:''}
  },
  mounted(){

    let wordEls = this.$refs.st.querySelectorAll('h1')
    this.$gsap.set(wordEls,{yPercent: 100})
    this.$gsap.set(this.$refs.rule,{scaleY:0, transformOrigin: 'bottom'})

    let tl = this.$gsap.timeline({paused: true})
    tl.to(this.$refs.rule,1,{scaleY:1,ease: 'power4.out', clearProps: 'all'},0)
    tl.to(wordEls,1,{yPercent:0, ease: 'power4.out', stagger: .07, clearProps:'all'},.3)

    this.$vb.addScrollElement(this.$refs.st,(e)=>{
      if (e.percent > .1){
        tl.play()
        this.$vb.removeScrollElement(this.$refs.st)
      }
    })

  },
}
</script>

<style lang="scss">
.section-title{
  position: relative;
  padding-left: $col + $gutter;

  hr{
    background: #1E0FC7;
    border: none;
    position: absolute;
    width: $gutter;
    margin: 0px;
    top: 0px;
    bottom: 11%;
    left: 0px;
  }

  .word{
    overflow: hidden;
  }

}

.right .section-title{
  padding-left: 0px;
  padding-right: $col2;
  text-align: right;
  hr{
    left: auto;
    right: 0px;
  }
}
</style>
