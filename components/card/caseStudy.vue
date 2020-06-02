<template lang="html">
  <card>
    <div ref="caseStudy" class="case-study" v-mouse="handleMouse" v-enter:custom="enterAnimation">

      <div v-if="image" class="image" ref="image" :style="{backgroundImage:`url(${image})`}"/>

      <h3 v-if="title" v-html="title" class="title header--sm" ref="title"/>

      <!--
      <div class="title-side" v-if="title" v-resize="initSideTitle">
        <div class="side-title" ref="sideTitle">
          <div class="side-title-text" ref="sideTitleText">
            <h1 v-for="i in 3" :key="i" v-html="title" ref="text"/>
          </div>
        </div>
      </div>
    -->

      <div class="link" ref="link">
        <fancy-link v-if="link" :to="link">check it out</fancy-link>
      </div>
    </div>
  </card>
</template>

<script>
import card from './index'
export default {
  components:{card},
  props:{
    image:{type: String, default: null},
    title:{type: String, default: null},
    link: {type: String, default: null}
  },
  data:()=>({
    sideTextAnimation: null,
    hoverAnimation: null
  }),
  mounted(){



    //if (this.title) this.initSideTitle()

    if (this.link || this.image || this.title){
      let tl = this.$gsap.timeline({paused: true})
      if (this.link) tl.to(this.$refs.link,.5,{opacity:1,yPercent: 0,ease:'sine.inOut'},0)
      if (this.image) tl.to(this.$refs.image,.5,{scale:1.05,ease:'sine.inOut'},0)
      //if (this.title) tl.to(this.$refs.sideTitle,.5,{opacity:1,ease:'sine.inOut'},0)
      this.hoverAnimation = tl
    }

  },
  methods:{
    enterAnimation(){
      let tl = this.$gsap.timeline({paused: true})
      tl.from(this.$refs.caseStudy,1,{yPercent: 50, opacity: 0, ease: 'power4.out'},0)
      if (this.title) tl.from(this.$refs.title,1,{yPercent: 100, opacity: 0,ease: 'power4.out'},.4)
      return tl
    },
    initSideTitle(){
      let width = this.$refs.sideTitle.offsetWidth
      let height = this.$refs.sideTitle.offsetHeight
      let speed = this.title.split('').length * .5 + 5

      this.$gsap.set(this.$refs.text,{clearProps: 'all'})
      this.$gsap.set(this.$refs.sideTitleText,{height:width, width: height,fontSize: width })
      this.sideTextAnimation = this.$gsap.to(this.$refs.text,speed,{xPercent: 100, repeat: -1, ease: 'none', paused: true})
    },
    handleMouse(e){

      if (e.enter) {
        //clearTimeout(this.timeout)
        //if (this.sideTextAnimation) this.sideTextAnimation.resume()
        if (this.hoverAnimation) this.hoverAnimation.reversed(false).play()

      }
      if (e.leave){
        //clearTimeout(this.timeout)
        if (this.hoverAnimation) this.hoverAnimation.reversed(true)
        //if (this.sideTextAnimation) this.timeout = setTimeout(()=> this.sideTextAnimation.pause(),750)
      }
    }
  }
}
</script>

<style lang="scss">

.case-study{
  height: 100%;
  position: relative;
  background: #ccc;
  overflow: hidden;

  .image{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
    background-size: cover;
    background-position: center center;
  }


  .title{
    position: absolute;
    top: 30px;
    left: 30px;
    color: white;
    max-width: 70%;
  }

  .link{
    color: white;
    position: absolute;
    bottom: 30px;
    left: 30px;
    opacity: 0;
  }
  .side-title{
    user-select: none;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom:0px;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;

    .side-title-text{
      opacity: .2;
      flex: 0 0 auto;
      transform: rotate(90deg);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    h1{
      flex: 0 0 auto;
      @include headerFont;
      padding: 0px 1vw;
      font-weight: 700;
      text-transform: uppercase;
      color: white;
      white-space: nowrap;
    }
  }

  @media (max-width: $tablet){
    .title{
      left: 20px;
      top: 20px;
    }
    .link{
      left: 20px;
      bottom: 20px;
    }
  }
}
</style>
