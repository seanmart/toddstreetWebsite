<template lang="html">
  <div class="staff-marquee" v-scroll="marqueeProps" :style="{width: `${boxWidth}px`, height: `${boxHeight}px`}">
    <div  class="employee" v-for="(employee,i) in staff" :key="i" ref="employee" >
      <div class="photo" :style="img(employee.image)"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    staff: Array,
    reverse: Boolean,
  },
  data(){
    return{
      animation: null,
      boxWidth: 300,
      boxHeight: 300,
      play: false,
      direction: 'down',
      distance: 0,
      backwards: false
    }
  },
  mounted(){

    this.distance = this.staff.length * this.boxWidth
    this.backwards = this.reverse

    this.$gsap.set(this.$refs.employee,{x: (x)=> x * this.boxWidth})
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
      this.animation = this.$gsap.to(this.$refs.employee, {
                        duration: this.staff.length * 6,
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
        offset: '-100%y',
        onEnter:()=> this.play = true,
        onLeave:()=> this.play = false
      }
    }
  }
}
</script>

<style lang="scss">
.staff-marquee{
  position: relative;
  transform: translateX(-300px);

  .employee{
    position: absolute;
    height: 100%;
    width: 100%;
    padding:2px;

    .photo{
      height: 100%;
      width: 100%;
      background-color: $snow;
      background-size: cover;
    }
  }
}
</style>
