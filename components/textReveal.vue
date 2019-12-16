<template lang="html">
  <div class="text-reveal" ref="container">
    <child-wrapper wrapperClass="line-container" childClass="line" childRef="line">
      <slot/>
    </child-wrapper>
  </div>
</template>

<script>
import childWrapper from '@/components/functions/childWrapper'
export default {
  components:{childWrapper},
  props:{
    play: Boolean
  },
  data(){
    return{
      lines: null
    }
  },
  mounted(){
    this.lines = Array.from(this.$refs.container.children).map(l => l.children[0])
    this.play && this.reveal()
  },
  watch:{
    play(){
      this.reveal()
    }
  },
  methods:{
    reveal(){
      this.$gsap.to(this.lines, 1, {y: '0%', stagger: .15, ease: 'power3.out'})
    }
  }
}
</script>

<style lang="scss">
  .text-reveal{
    flex: 0 0 auto;
    .line-container{
     overflow: hidden;
   }
   .line{
     transform: translateY(100%);
     display: block;
     white-space: nowrap;
   }
  }


</style>
