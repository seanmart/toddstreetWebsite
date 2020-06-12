<template lang="html">
  <div class="case-study" :class="{hover, scroll}">
      <div class="height">
        <div class="wrapper">
          <div class="content" ref="content" v-mouse="handleMouse" v-enter:custom="handleEnter">

            <h3 class="title header--sm" ref="title" v-html="title"/>
            <div class="bg" v-image="image" v-bg="color"/>
            <nuxt-link v-if="link" class="big-link" :to="link"/>
            <fancy-link v-if="link" class="link" :to="link"/>

            <div class="side-text-container">
              <div class="side-text" ref="sidetext">
                <h1 class="text" v-for="i in count" v-html="title"/>
              </div>
            </div>

            <div v-if="$slots.default && $slots.default.length > 0"  class="slot-container">
              <div ref="slot" class="slot">
                <slot/>
              </div>
            </div>

          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props:{
    image:{type: String, default: null},
    title:{type: String, default: null},
    link: {type: String, default: null},
    color: {type: String, default: null}
  },
  data:()=>({
    count: 4,
    hover: false,
    scroll: false,
    timeout: null
  }),
  mounted(){
    let length = this.title.split('').length
    this.count = length < 10 ? 6 : length < 15 ? 5 : 4

    gsap.set(this.$refs.sidetext,{animationDuration: length * .5 + 's'})
  },
  methods:{
    handleEnter(){
      let tl = gsap.timeline({paused: true})
      tl.from(this.$refs.content, 1,{yPercent: 50,ease: 'power2.out'},0)
      tl.from(this.$refs.title, 1,{yPercent: 50, opacity:0,ease: 'power2.out'},.4)
      if (this.$refs.slot) tl.from(this.$refs.slot,1,{yPercent: 50,opacity: 0, ease: 'power2.out'},.5)
      return tl
    },
    handleMouse(e){
      if (e.enter) {
        clearTimeout(this.timeout)
        this.scroll = true
        this.hover = true
      }
      if (e.leave) {
        this.hover = false
        this.timeout = setTimeout(()=> this.scroll = false, 500)
      }
    }
  }
}
</script>

<style lang="scss">

.case-study{
  color: white;

  .height{
    width: 100%;
    padding-bottom: 100%;
    position: relative;
  }
  .wrapper{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .content{
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #ddd;
  }

  .title{
    z-index: 2;
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 30px;
    user-select:none;
    pointer-events: none;
  }

  .link{
    z-index: 2;
    position: absolute;
    bottom: 0px;
    left: 0px;
    padding: 30px;
    transform: translateY(100%);
    transition: transform .5s;
  }

  .big-link{
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 1;
    cursor: pointer;
  }

  .bg{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 0;
    transition: transform .5s;
    background-size: cover;
    background-position: center center;
  }

  .side-text-container{
    user-select:none;
    pointer-events: none;
    position: absolute;
    z-index: 2;
    right: 0px;
    height: 100%;
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transform: translateX(100%);
    transition: transform .5s;
  }

  .side-text{
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    opacity: .85;
    transform: rotate(-90deg);

    br{
      display: none;
    }
  }

  .text{
    @include headerFont;
    letter-spacing: -2px;
    font-size: 80px;
    font-weight: 600;
    flex: 0 0 auto;
    white-space: nowrap;
    color: white;
    padding: 0px 20px;
  }

  .slot-container{
    user-select:none;
    pointer-events: none;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: 1;
    transition: transform .5s;
  }
  .slot{
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  &.hover{
    .side-text-container{
      transform: translateX(0px);
    }
    .slot-container{
      transform: scale(.95);
    }
    .link{
      transform: translateY(0px);
    }
    .bg{
      transform: scale(1.05)
    }
  }

  &.scroll{
    .text{
      animation-name: marquee;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-duration: inherit;
    }
  }

  @media (max-width: $tablet){
    .side-text-container{
      width: 60px;
    }
    .text{
      font-size: 50px;
    }
  }

  @media (max-width: $mobile){
    margin: 0px 0px 20px !important;
    flex: 0 0 100% !important;
    width: 100% !important;
    transform: none !important;
    .height{
      padding-bottom: 60vh !important;
    }
    .wrapper{
      top: 0px !important;
      left: 0px !important;
      height: 100% !important;
      width: 100% !important;
    }
    .content{
      margin: 0px !important;
    }
  }

}

.touch{
  .case-study{
    .side-text-container{
      display: none;
    }
    .link{
      transform: none;
      opacity: 1;
    }
  }
}

</style>
