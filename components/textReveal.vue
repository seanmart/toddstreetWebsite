<template lang="html">
  <div class="reveal" ref="container" :class="{horizontal, hide}">
    <child-wrapper v-if="$slots.default.length > 1" wrapperClass="reveal-item">
      <slot/>
    </child-wrapper>
    <slot v-else/>
  </div>
</template>

<script>
import childWrapper from '@/components/functions/childWrapper'
export default {
  components:{childWrapper},
  props:{
    horizontal: Boolean,
    delay: {type:Number, default: 0},
    play: {type:Boolean, defualt: true}
  },
  data(){
    return{
      lines: null,
      hide: true,
      animation: null
    }
  },
  mounted(){
    let count = this.$slots.default.length
    this.lines = Array.from(this.$refs.container.children).map(l => count > 1 ? l.children[0] : l)
    this.play && this.reveal()
  },
  watch:{
    play(play){
      this.reveal(play)
    }
  },
  methods:{
    reveal(reveal){
      if (reveal){
        this.animation = this.$gsap.to(this.lines, 1, {x:0, y:0, stagger: .15, ease: 'power3.out', delay: this.delay, onComplete: this.complete})
      } else if(this.animation){
        this.animation.reverse()
      }
    },
    complete(){
      this.hide = false
      this.$emit('done')
    }
  }
}
</script>

<style lang="scss">
  .reveal{
   &.horizontal{
     .reveal-item{
       display: inline-block;
       line-height: 0;
     }
   }

   &.hide{
     overflow: hidden;
     .reveal-item{
       overflow: hidden;
     }
   }

   .reveal-bottom{
     transform: translateY(100%);
     white-space: nowrap;
     display: block;
   }

   .reveal-top{
     transform: translateY(-100%);
     white-space: nowrap;
     display: block;
   }

   .reveal-left{
      transform: translateX(-100%);
      white-space: nowrap;
      display: block;
   }

   .reveal-right{
     transform: translateX(100%);
     white-space: nowrap;
     display: block;
   }
  }


</style>
