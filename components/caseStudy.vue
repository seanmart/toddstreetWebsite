<template lang="html">
  <div class="case-study" ref="caseStudy">
    <div class="image" ref="image" v-parallax="'50%'" v-image="data.image"/>
    <div class="marquee-container" ref="marqueeContainer">
      <div class="marquee title--font">
        <h1 v-for="i in 3" v-html="data.title" ref="marquee"/>
      </div>
    </div>
    <div class="wrapper">
      <div class="content">
        <h3 class="title--font title--md" v-html="data.title"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['data'],
  data:()=>({
    active: false,
    marqueeAnimation:null
  }),
  mounted(){

    gsap.set(this.$refs.marqueeContainer,{xPercent: 100,opacity:0})
    let duration = this.data.title.split('').length * .5
    this.marqueeAnimation = gsap.to(this.$refs.marquee,duration,{xPercent: 100,repeat: -1, ease: 'none', paused: true})

    MouseBuddy.create(this.$refs.caseStudy,{
      onEnter:()=> this.active = true,
      onLeave:()=> this.active = false
    })
  },
  watch:{
    active(active){
      active && gsap.timeline()
                    .to(this.$refs.image,.5,{scale:1.05},0)
                    .to(this.$refs.marqueeContainer,.5,{xPercent:0,opacity:1, ease: 'power2.out'},0)
                    .add(()=>this.marqueeAnimation.play(),0)

      !active && gsap.timeline()
                     .to(this.$refs.image,.5,{scale:1})
                     .to(this.$refs.marqueeContainer,.35,{xPercent: 100,opacity:0, ease: 'power2.in'},0)
                     .add(()=>this.marqueeAnimation.pause())
    }
  }
}
</script>

<style lang="scss">
  .case-study{
    padding-bottom: 100%;
    background: #999;
    position: relative;
    overflow: hidden;

    .wrapper{
      position: absolute;
      top:0px;
      right: 0px;
      left: 0px;
      bottom: 0px;
      padding: 30px;
    }

    .image{
      position: absolute;
      bottom:0px;
      left: 0px;
      right: 0px;
      height: 155%;
      background-size: cover;
      background-position: center center;
    }

    .marquee-container{
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .marquee{
      flex: 0 0;
      transform: rotate(90deg);
      white-space: nowrap;
    }

    h1{
      color: white;
      display: inline-block;
      white-space: nowrap;
      padding: 0px 50px;
      font-size: 100px;
      font-weight: 600;
    }


    .content{
      position: relative;
      height: 100%;
    }

    h3{
      color: white;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 1;
      font-size: 40px;
    }
  }
</style>
