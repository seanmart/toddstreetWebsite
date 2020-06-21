<template lang="html">
  <div class="cursor-zone" ref="cursorZone">
    <slot/>
  </div>
</template>

<script>
export default {
  data:()=>({
    el: null,
    offsetTop: 0,
    offsetLeft: 0,
    height: 0,
    width: 0,
  }),
  mounted(){

    if (!this.$slots.default) return
    this.initEl()

    resizer.add(this.getOffset)

    MouseBuddy.create(this.$refs.cursorZone,{
      onEnter: this.onEnter,
      onActive:this.onActive,
      onLeave: this.onLeave
    })
  },
  methods:{
    initEl(){
      this.el = this.$slots.default[0].elm
      this.getOffset()
      gsap.set(this.el, {opacity:0, scale: 0})
    },
    getOffset(){
      this.offsetTop = this.el.offsetTop + (this.el.offsetHeight / 2)
      this.offsetLeft = this.el.offsetLeft + (this.el.offsetWidth / 2)
    },
    onEnter(){
      gsap.to(this.el,.25,{opacity: 1, scale: 1})
    },
    onActive(e){
      gsap.set(this.el,{
        y: e.offsetY - this.offsetTop,
        x: e.offsetX - this.offsetLeft
      })
    },
    onLeave(){
      gsap.to(this.el,.25,{opacity: 0, scale: 0})
    }
  }
}
</script>
