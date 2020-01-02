<template lang="html">
  <div class="reveal" ref="container" :class="{side, opposite, horizontal}">

    <child-wrapper wrapperClass="reveal-line-container" childClass="reveal-line">
      <slot/>
    </child-wrapper>

  </div>
</template>

<script>
import childWrapper from '@/components/functions/childWrapper'
export default {
  components:{childWrapper},
  props:{
    play: Boolean,
    side: Boolean,
    horizontal: Boolean,
    opposite: Boolean,
    delay: {type:Number, default: 0}
  },
  data(){
    return{
      lines: null,
      animation: null
    }
  },
  mounted(){
    this.lines = Array.from(this.$refs.container.children).map(l => l.children[0])
    this.play && this.reveal()
  },
  watch:{
    play(play){
      this.reveal()
    }
  },
  methods:{
    reveal(){
      if (!this.lines[0]) return
      this.animation = this.side
      ? this.$gsap.to(this.lines, 1, {x: '0%', stagger: .15, ease: 'power3.out', delay: this.delay})
      : this.$gsap.to(this.lines, 1, {y: '0%', stagger: .15, ease: 'power3.out', delay: this.delay})
    }
  }
}
</script>

<style lang="scss">
  .reveal{

    .reveal-line-container{
     overflow: hidden;
     display: block;
   }

   .reveal-line{
     transform: translateY(100%);
     white-space: nowrap;
     display: block;
   }
   &.opposite{
     .reveal-line{
       transform: translateY(-100%);
     }
   }
   &.side{
     .reveal-line{
       transform: translateX(-100%);
     }
   }
   &.horizontal{
     .reveal-line-container{
       display: inline-block;
     }
   }
   &.opposite.side{
     .reveal-line{
       transform: translateX(100%);
     }
   }
  }


</style>
