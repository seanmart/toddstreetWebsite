<template lang="html">
  <card>
    <div
    ref="caseStudy"
    class="case-study"
    :class="{show,scroll}"
    v-mouse="handleMouse"
    v-enter:custom="enterAnimation"
    :style="{background: color || '#ccc'}"
    >

      <div v-if="image" class="image" ref="image" :style="{backgroundImage:`url(${image})`}"/>

      <h3 v-if="title" v-html="title" class="title header--sm" ref="title"/>

      <div class="title-side" v-if="title" v-resize="initSideTitle">
        <div class="side-title" ref="sideTitle">
          <div class="side-title-text" ref="sideTitleText">
            <h1
              v-for="i in 3"
              :key="i"
              v-html="title"
              ref="text"
              :style="{animationDuration: setSpeed(title)}"
              />
          </div>
        </div>
      </div>

      <div v-if="$slots.default && $slots.default.length > 0" class="slot" ref="slot">
        <slot/>
      </div>

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
    link: {type: String, default: null},
    color: {type: String, default: null},
  },
  data:()=>({
    show: false,
    scroll: false,
    timeout: null
  }),
  mounted(){

    if (this.title) this.initSideTitle()

  },
  methods:{
    setSpeed(text){
      return (text.split('').length * .25) + 5 + 's'
    },
    enterAnimation(){
      let hasSlot = this.$slots.default && this.$slots.default.length > 0
      let tl = this.$gsap.timeline({paused: true})
      tl.from(this.$refs.caseStudy,1,{yPercent: 50, opacity: 0, ease: 'power4.out'},0)
      if (this.title) tl.from(this.$refs.title,1,{yPercent: 100, opacity: 0,ease: 'power4.out'},.4)
      if (hasSlot) tl.from(this.$refs.slot, 1,{yPercent: 100, opacity: 0, ease: 'power4.out'},.6)
      return tl
    },
    initSideTitle(){
      let width = this.$refs.sideTitle.offsetWidth
      let height = this.$refs.sideTitle.offsetHeight
      this.$gsap.set(this.$refs.sideTitleText,{height:width, width: height,fontSize: width })
    },
    handleMouse(e){

      if (e.enter) {
        clearTimeout(this.timeout)
        this.show = true
        this.scroll = true
      }
      if (e.leave){
        clearTimeout(this.timeout)
        this.show = false
        this.timeout = setTimeout(()=> this.scroll = false,500)
      }
    }
  }
}
</script>

<style lang="scss">

.case-study{
  height: 100%;
  position: relative;
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
    transition: transform .5s;
  }

  .slot{
    position: absolute;
    top: 10%;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      transition: transform .5s;
    }
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
    transform: translateY(50%);
    transition: transform .5s, opacity .5s;
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
    transition: opacity .5s, transform .5s;
    transform: translateX(20%);
    opacity: 0;

    .side-title-text{
      opacity: .3;
      flex: 0 0 auto;
      transform: rotate(-90deg);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    br{
      display: none;
    }

    h1{
      flex: 0 0 auto;
      @include headerFont;
      padding: 0px 1vw;
      font-weight: 900;
      text-transform: uppercase;
      color: white;
      white-space: nowrap;
    }
  }

  &.show{
    .link{
      opacity: 1;
      transform: translateY(0px);
    }
    .image{
      transform: scale(1.05);
    }
    .side-title{
      transform: translateX(0px);
      opacity: 1;
    }
    .slot img{
      transform: scale(.95);
    }
  }

  &.scroll{
    .side-title-text h1{
      animation-name: marquee;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }

  @media (max-width: $tablet){
    .title{
      left: 20px;
      top: 20px;
    }
    .link{
      opacity: 1;
      transform: translateY(0px);
      left: 20px;
      bottom: 20px;
    }
  }
}

@keyframes marquee{
  0%{
    transform: translateX(0px);
  }
  100%{
    transform: translateX(-100%);
  }
}
</style>
