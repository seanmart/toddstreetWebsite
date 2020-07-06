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
    active: false,
    timeout: null
  }),
  props:{
    hideOnStop: {type: Boolean, default: false}
  },
  watch:{
    hideOnStop(hide){
      this.toggleEl(!hide)
    }
  },
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
    toggleEl(show){
      show
      ? gsap.to(this.el,.25,{opacity: 1, scale: 1})
      : gsap.to(this.el,.25,{opacity: 0, scale: 0})
    },
    initEl(){
      this.el = this.$slots.default[0].elm
      this.getOffset()
      gsap.set(this.el, {opacity:0, scale: 0})
    },
    getOffset(){
      this.offsetTop = this.el.offsetTop + (this.el.offsetHeight / 2)
      this.offsetLeft = this.el.offsetLeft + (this.el.offsetWidth / 2)
    },
    onActive(e){
      if (!this.active){
        this.toggleEl(true)
        this.active = true
      }

      gsap.set(this.el,{
        y: e.offsetY - this.offsetTop,
        x: e.offsetX - this.offsetLeft
      })

      clearTimeout(this.timeout)
      this.timeout = setTimeout(()=>{
        this.active = false
        this.hideOnStop && this.toggleEl(false)
      },100)
    },
    onLeave(){
      this.$emit('leave')
      this.toggleEl(false)
    }
  }
}
</script>
