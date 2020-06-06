<template lang="html">
  <section id="intro" v-section v-scroll="handleScroll">

    <div class="header-container header--hg">
      <div class="wrapper">
        <transition name="slideup" v-on:enter="(e)=> addMarquee(e)" v-on:after-leave="removeMarquee">
          <div class="header" :key="index">
            <template v-for="i in 4">
              <h1 v-if="index > -1" v-html="data[index].header"/>
            </template>
          </div>
        </transition>
      </div>
    </div>

    <div class="content-container">
      <div class="section">

        <div class="wrapper">
          <transition name="fade">
            <p class="message body--bg" :key="index" v-html=" index > -1 ? data[index].message : ''"/>
          </transition>

          <div class="timer navigation--rg">
              <div class="index" >
                <transition name="slideup">
                <p :key="index">0{{index > -1 ? index + 1 : 1}}</p>
                </transition>
              </div>
            <div class="bar-container">
              <div class="bar"/>
            </div>
            <p class="count">0{{data.length}}</p>
          </div>
        </div>

        <div class="texture"/>

      </div>

      <div class="image-container">

        <div
          v-for="(item,i) in data"
          :key="i"
          class="image"
          :class="`image-${i}`"
          v-image="item.image"
          />

        <div class="header-container header--hg">
          <div class="wrapper">
            <transition name="slideup" v-on:enter="(e)=> addMarquee(e,true)" v-on:after-leave="removeMarquee">
              <div class="header" :key="index">
                <template v-for="i in 4">
                  <h1 v-if="index > -1" v-html="data[index].header"/>
                </template>
              </div>
            </transition>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:['data', 'ready'],
  data:()=>({
    index: -1,
    marquee:[],
    timer: null,
    speed: 10,
    duration: 8
  }),
  watch:{
    ready(){
      let tl = gsap.timeline()
      tl.add(this.next,0)
      tl.set('#intro',{opacity:1},0)
      tl.set('#intro .bar',{scaleX:0},0)
      tl.set('#intro .wrapper',{transitionDelay:.5},0)
      tl.from('#intro .texture',.75,{xPercent:-100, ease: 'power2.out', clearProps: 'all'},0)
      tl.from('#intro .timer',.75,{yPercent: 50, opacity: 0,  ease: 'power4.out'})
      tl.set('#intro .wrapper',{clearProps:'all'},.5)
    }
  },
  mounted(){
    gsap.set('#intro',{opacity:0})
  },
  methods:{
    handleScroll(e){
      if (e.leave){
        this.marquee.forEach(m => m.gsap.pause())
        gsap.set('#intro .image',{display: 'none'})
        this.timer.pause()
      }
      if (e.enter && e.scroll.direction == 'up'){
        this.marquee.forEach(m => m.gsap.play())
        gsap.set('#intro .image',{clearProps:'display'})
        this.timer.play()
      }
    },
    removeMarquee(el){
      let index = this.marquee.findIndex(e => e.el == el)
      if (index > -1){
        this.marquee[index].gsap.kill()
        this.marquee.splice(index,1)
      }
    },
    addMarquee(el){
      this.marquee.push({el: el,gsap: gsap.to(el.childNodes, this.speed, {xPercent: -100, ease: 'none', repeat: -1})})
    },
    next(){
      let lastIndex = this.index
      let index = this.index < this.data.length - 1 ? this.index + 1 : 0

      this.speed = this.data[index].header.split('').length * (this.$vb.touch ? .25 : .5)
      this.timer = gsap.fromTo('#intro .bar',this.duration,{scaleX:0},{scaleX:1, ease: 'none', onComplete: this.next})

      let tl = gsap.timeline()
      tl.set(`#intro .image-${index}`,{zIndex: 1},0)
      tl.to(`#intro .image-${index}`,1,{xPercent: 100, ease: 'power2.out'},0)

      if (lastIndex > -1) {
        tl.to(`#intro .image-${lastIndex}`,1,{xPercent: 150, ease: 'power2.out'},0)
        tl.set(`#intro .image-${lastIndex}`,{clearProps: 'z-index'},0)
        tl.set(`#intro .image-${lastIndex}`,{clearProps: 'transform'})
      }

      this.index = index
    }
  }
}
</script>

<style lang="scss">

#intro{
  height: calc(100vh - #{$desktop-section-space * 2});
  min-height: 550px;
  position: relative;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  box-sizing: content-box;



  .header-container{
    position: absolute;
    top: 75px;
    height: 90px;
    right: 0px;
    width: 100vw;
    overflow: hidden;
    z-index: 1;

    .wrapper{
      position: relative;
      height: 100%;
    }

    .header{
      transition-delay: inherit;
      display: flex;
      flex-direction: row;
      justify-content: center;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }

    h1{
      flex: 0 0 auto;
      line-height: 73%;
      padding: 0px 20px;
    }
  }

  .content-container{
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    padding-right: $desktop-margins;
  }



  .section{
    flex: 1 1 auto;
    position: relative;
    padding-bottom: 50px;
    padding-top: 230px;
    padding-right: 50px;
    overflow: hidden;

    .wrapper{
      height: 100%;
      position: relative;
    }

    .message{
      transition-delay: inherit;
      max-width: 700px;
      position: absolute;
      top: 0px;
      left: 0px;
    }

    .texture{
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      z-index: -1;
    }
  }



  .timer{
    position: absolute;
    bottom: 0px;
    right: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    max-width: 300px;

    p{
      line-height: 100%;
    }

    .index{
      position: relative;
      flex: 0 0 auto;
      height: 16px;
      width: 18px;
      overflow: hidden;

      // ANIMATED
      p{
        position: absolute;
        bottom: 0px;
        right: 0px;
      }
    }

    .bar-container{
      flex: 1 1 auto;
      margin: 0px 20px 4px;
      background: #ddd;
      .bar{
        background: $blue;
        width: 100%;
        height: 4px;
      }
    }

    .count{
      flex: 0 0 auto;
    }
  }



  .image-container{
    flex: 0 0 auto;
    width: $col3;
    overflow: hidden;
    position: relative;
    z-index: 1;

    .image{
      position: absolute;
      top: 0px;
      left: -100%;
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center center;
      z-index: 0;
    }

    .header-container{
      color: white;
      right: -$desktop-margins;
    }
  }

  .fade-leave-active,.fade-enter-active,
  .slideleft-leave-active,.slideleft-enter-active,
  .slideup-leave-active, .slideup-enter-active{transition: .75s}

  .slideup-enter{transform: translateY(100%)}
  .slideup-leave-to{transform: translateY(-100%)}

  .slideleft-enter{transform: translateX(-100%)}
  .slideleft-leave-to{transform: translateX(100%)}

  .fade-enter{transform: translateX(-20%); opacity: 0}
  .fade-leave-to{transform: translateX(20%); opacity: 0}

  @media (max-width: $tablet){

    height: calc(100vh - #{$tablet-section-space * 2});
    max-height: none;

    .header-container{
      top: 60px;
      height: 70px;
    }
    .section{
      padding-top: 170px;
    }
    .content-container{
      padding-right: $tablet-margins;
    }
    .image-container{
      .header-container{
        right: -$tablet-margins;
      }
    }
  }

  @media (max-width: $mobile){

    height: calc(100vh - #{$mobile-section-space * 2});

    .header-container{
      top: 72px;
      height: 54px;
    }
    .content-container{
      padding-right: $mobile-margin-right;
      flex-direction: column-reverse;
    }
    .section{
      padding: $mobile-margin-left;
    }
    .timer{
      max-width: none;
      width: auto;
      left: 0px;
    }
    .image-container{
      width: 100%;
      height: 200px;
      .header-container{
        right: -$mobile-margin-right
      }
    }
  }
}

</style>
