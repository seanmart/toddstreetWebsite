<template lang="html">
  <div class="big-title" ref="container">
    <div class="bar" ref="bar"/>

    <template v-for="(word,i) in words">

      <br v-if="word == '<br/>'" :key="i"/>

      <div v-else class="word" :key="i">
        <h1 v-html="word + '&nbsp'" ref="word"/>
      </div>

    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    text: String,
  },
  mounted(){

    this.$vb.addElement(this.$refs.container,{
      onEnter:({direction})=>{
        if (direction !== 'down') return
        let tl = this.$gsap.timeline({delay: .25})
        tl.fromTo(this.$refs.word,1,{yPercent:100},{yPercent:0,stagger:.1 ,ease: 'power4.out'},.2)
        tl.fromTo(this.$refs.bar,.8,{scaleY:0},{scaleY:1, transformOrigin: 'bottom', ease: 'power4.out'},0)
      }
    })

  },
  computed:{
    words(){
      return this.text.split(' ')
    }
  }
}
</script>

<style lang="scss">
.big-title{
  position: relative;
  padding-left: $colNext;

  .bar{
    width: 1.25vw;
    position: absolute;
    top: 2.1%;
    left: 0px;
    bottom: 2.1%;
    background: #002E60;
  }

  .word{
    display: inline-block;
    overflow: hidden;

    h1{
      display: inline-block;
      font-size: 8vw;
      font-weight: 700;
      letter-spacing: -1px;
      line-height: 80%;
      text-transform: uppercase;
    }
  }

  .bar{
    position: absolute;
    left: 0px;
  }

  @media (max-width: $tablet){
    .word h1{
      font-size: 10vw;
    }
  }

  @media (max-width: $mobile){
    .word h1{
      font-size: 14.6vw;
      letter-spacing: -1.75px;
    }
  }
}
</style>
