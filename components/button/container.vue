<template lang="html">
  <div class="btn-container" v-mouse="handleMouse" v-resize="getBtnPosition">
    <slot/>
  </div>
</template>

<script>
import tools from '@/assets/virtualBuddy/tools'
export default {
  data:()=>({
    btn:{
      x:0,
      y:0,
      top:0,
      left: 0,
      height: 0,
      width: 0,
      el:null,
    },
    cursor:{
      x: 0,
      y:0
    },
    ticking: false,
    ready: false,
    status: null,
    raf: null
  }),
  mounted(){
    if (this.$slots && this.$slots.default && this.$slots.default.length > 0){
      this.btn.el = this.$slots.default[0].elm
      this.getBtnPosition()
      this.ready = true
    }
  },
  methods:{
    getBtnPosition(){
      this.btn.top = this.btn.el.offsetTop
      this.btn.left = this.btn.el.offsetLeft
      this.btn.height = this.btn.el.offsetHeight
      this.btn.width = this.btn.el.offsetWidth
    },
    handleMouse(e){
    if (!this.ready) return

      if (e.enter) {
        this.status = 'enter'
        this.$emit('enter')
      }

      if (e.active){
       this.cursor = {
         x: e.x - this.btn.left - this.btn.width / 2,
         y: e.y - this.btn.top - this.btn.height / 2
       }

       if (!this.ticking) {
         this.$emit('active', true)
         this.check()
       }
     }

     if (e.leave) {
       this.status = 'leave'
       this.cursor = {x:0,y:0}
       if (!this.ticking) this.check()
       this.$emit('leave')
     }
   },
   check(){
     let inertia = this.status == 'leave' ? .05 : .2
     this.ticking = Math.abs(this.cursor.x - this.btn.x) > .5 || Math.abs(this.cursor.y - this.btn.y) > .5
     this.btn.x = tools.lerp(this.btn.x,this.cursor.x,inertia)
     this.btn.y = tools.lerp(this.btn.y,this.cursor.y,inertia)

     requestAnimationFrame(()=>{
       let transform = `matrix(1,0,0,1,${this.btn.x},${this.btn.y})`
       this.btn.el.style.webkitTransform = transform;
       this.btn.el.style.msTransform = transform;
       this.btn.el.style.transform = transform;
       this.ticking ? this.check() : this.$emit('active', false)
     })
   }
  }
}
</script>

<style lang="scss">

.btn-container{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
