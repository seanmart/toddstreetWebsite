<template lang="html">
  <div
  ref="marquee"
  v-html="string"
  class="marquee"
  :class="{reverse}"
  :style="{animationDuration:`${speed}s`, animationDelay:`${delay}s`}"
  />
</template>

<script>
export default {
  props:{
    text: {type: Array, default: ()=>[]},
    speed: {type:Number, default: 30},
    delay: {type:Number, default: 0},
    reverse: Boolean
  },
  mounted(){
    let svg = this.$refs.marquee.children[0]
    let rect = svg.children[0].getBBox()
    svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  },
  computed:{
    string(){
      let string = this.text.reduce((a,c)=> a += `${c}&nbsp&nbsp`,'')
      return `<svg><text x="0%" y="80%">${string}${string}</text></svg>`
    }
  }
}
</script>

<style lang="scss">
  .marquee{
    animation-name: marquee;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    font-size: 60px;
    letter-spacing: 1px;
    height: 60px;
    display: inline-block;
    svg{
      height: 100%;
      display: inline-block;
      stroke: $snow;
      fill: rgba(0,0,0,0);
      text{
        @include roboto;
      }
    }
    &.reverse{
      animation-name: marqueeReverse;
    }
  }

  @keyframes marquee{
    0%{
      transform: translateX(0%);
    }
    100%{
      transform: translateX(-50%);
    }
  }

  @keyframes marqueeReverse{
    0%{
      transform: translateX(-50%);
    }
    100%{
      transform: translateX(0%);
    }
  }
</style>
