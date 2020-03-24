<template lang="html">
  <div
    class="follow-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
    v-scroll="{onScroll,offset: -100}"
    >
    <slot/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      el: null,
      inertia: .12,
      inZone: false,
      ticking: false,
      animate: false,
      position: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      cursor:{
        x:0,
        y:0,
      },
      follower:{
        x: 0,
        y:0,
        offset:{
          x:0,
          y:0
        },
        limits:{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }
      }
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.el = this.$refs.container.children[0]
      let b = this.$refs.container.getBoundingClientRect()
      let f = this.el.getBoundingClientRect()

      this.follower.offset.x = f.left - b.left + (f.width / 2)
      this.follower.offset.y = f.top - b.top + (f.height / 2)

      this.follower.limits.top = b.top - f.top
      this.follower.limits.left = b.left - f.left
      this.follower.limits.bottom = b.bottom - f.bottom
      this.follower.limits.right = b.right - f.right
    },
    lerp(start, end, amt){
        return (1 - amt) * start + amt * end
    },
    handleMouseMove(e){
      this.updateCursor(e)
      !this.ticking && this.checkMove()
    },
    handleMouseEnter(e){
      this.inertia = .1
      this.inZone = true
    },
    handleMouseLeave(e){
      this.ticking = false
      this.cursor.x = 0
      this.cursor.y = 0
      this.inertia = .05
      this.inZone = false
      this.checkMove()
    },
    updateCursorScroll({x,y}){
      let l = this.follower.limits
      this.cursor.x = parseInt(Math.min(Math.max(x,l.left),l.right))
      this.cursor.y = parseInt(Math.min(Math.max(y,l.left),l.right))
    },
    updateCursor(e){
      let l = this.follower.limits
      let o = this.follower.offset
      let p = this.position

      this.cursor.x = parseInt(Math.min(Math.max(e.clientX - p.left - o.x,l.left),l.right))
      this.cursor.y = parseInt(Math.min(Math.max(e.clientY - p.top - o.y, l.top), l.bottom))
    },
    updateFollower(){
      this.follower.x = this.lerp(this.follower.x, this.cursor.x, this.inertia);
      this.follower.y = this.lerp(this.follower.y, this.cursor.y, this.inertia);
    },
    checkMove(){

      this.ticking = Math.abs(this.follower.x - this.cursor.x) > .01 || Math.abs(this.follower.y - this.cursor.y) > .01

      if (this.ticking){
        requestAnimationFrame(()=>{
          this.updateFollower()
          this.transform(this.follower.x,this.follower.y)
          this.checkMove()
        })
      }
    },
    onScroll(){
      let b = this.$refs.container.getBoundingClientRect()
      let diff = this.position.top - b.top
      this.position.left = b.left
      this.position.top = b.top
      this.position.right = b.right
      this.position.bottom = b.bottom

      if (this.inZone){
        this.updateCursorScroll({
          x: this.cursor.x,
          y: this.cursor.y + diff
        })

        !this.ticking && this.checkMove()
      }


    },
    transform(x,y){
        let transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${x},${y},0,1)`;

        this.el.style.webkitTransform = transform
        this.el.style.msTransform = transform
        this.el.style.transform = transform
    }
  }
}
</script>

<style lang="scss">
  .follow-container{
    position: relative;

    .follower{
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>
