<template lang="html">
  <div class="reveal" ref="reveal">
      <slot/>
  </div>
</template>

<script>
export default {
  props:{
    play: {type: [String, Boolean], default: null},
    delay: {type: Number, default: 0},
    duration: {type: Number, default: 1},
    top: Boolean,
    left: Boolean,
    right: Boolean
  },
  data(){
    return{
      el: null
    }
  },
  mounted(){
    this.el = this.$refs.reveal.children

    this.$gsap.set(this.el,{opacity: 0})

    this.$nextTick(()=>{
      if (this.play === null) this.$vb.addElement(this.$refs.text,{onEnter:()=> this.reveal()})
    })
  },
  methods:{
    reveal(){
      let from = this.left ? {xPercent: -50}
                    : this.right ? {xPercent: -50}
                    : this.top ? {yPercent: -50}
                    : {xPercent: 50}

      let to = {
        yPercent: 0,
        xPercent: 0,
        opacity: 1,
        stagger:.2,
        ease:'power4.out',
        delay: this.delay
      }

      this.$gsap.fromTo(this.el,this.duration,from,to)
    }
  },
  watch:{
    play(){
      this.reveal()
    }
  }
}
</script>

<style lang="scss">

</style>
