<template lang="html">
  <div class="marquee" v-scroll="marqueeProps">
    <div class="marquee-items" ref="marquee">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    staff: Array,
    reverse: Boolean
  },
  data(){
    return{
      duration: 60,
      animation: null,
      play: false,
      direction: 'down',
      distance: 0,
      width: 0,
      backwards: false,
      els: null
    }
  },
  mounted(){
    this.els = this.$refs.marquee.children
    this.distance = Array.from(this.els).reduce((a,i)=> a += i.offsetWidth,0)
    this.backwards = this.reverse
    this.duration = this.els.length * 10
    this.width = this.$refs.marquee.offsetWidth

    this.$gsap.set(this.els,{x: (x)=> x * this.width})

    this.addAnimation(true)

    this.$scrollbuddy.onScroll((e)=>{
      if (!this.play) return
      this.animation.timeScale(1 + Math.abs((e.delta.y - e.scroll.y) / 20))
      if (this.direction !== e.direction){
        this.direction = e.direction
        this.backwards = !this.backwards
        this.addAnimation(false)
      }
    })

  },
  watch:{
    play(play){
      play
      ? this.animation.resume()
      : this.animation.pause()
    }
  },
  methods:{
    addAnimation(pause){
      this.animation = this.$gsap.to(this.els, {
                        duration: this.duration,
                        ease: "none",
                        x: `+=${this.distance}`,
                        modifiers: {
                          x: this.$gsap.utils.unitize(x => parseFloat(x) % this.distance)
                        },
                        repeat: -1,
                        paused: pause,
                        runBackwards: this.backwards
                      });
    },
    img(url){
      return {backgroundImage: `url(${url})`}
    }
  },
  computed:{
    marqueeProps(){
      return{
        transform: false,
        offset: '-100%y',
        onEnter:()=> this.play = true,
        onLeave:()=> this.play = false
      }
    }
  }
}
</script>

<style lang="scss">
.marquee{
  position: relative;

  .marquee-items{
    display: inline-block;
    transform: translateX(-100%);
  }

  .marquee-item{
    display: inline-block;
    position: absolute;
    top: 0px;
    left: 0px;

    &:first-child{
      position: relative;
    }
  }
}
</style>
