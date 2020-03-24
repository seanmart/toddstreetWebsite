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
      boxWidth: 200,
      boxHeight: 200,
      play: false,
      direction: 'down'
    }
  },
  mounted(){

    let distance = this.staff.length * this.boxWidth

    this.$gsap.set(this.$refs.employee,{x: (x)=> x * this.boxWidth})

    this.animation = this.$gsap.to(this.$refs.employee, {
                      duration: this.staff.length * 6,
                      ease: "none",
                      x: `+=${distance}`,
                      modifiers: {
                        x: this.$gsap.utils.unitize(x => parseFloat(x) % distance)
                      },
                      repeat: -1,
                      paused: true,
                      runBackwards: this.reverse
                    });

    this.$scrollbuddy.onScroll((e)=>{
      if (!this.play) return
      this.animation.timeScale(1 + Math.abs((e.delta.y - e.scroll.y) / 20))
      if (this.direction !== e.direction) this.animation.reversed() ? this.animation.play() : this.animation.reverse()
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
