<template lang="html">
  <section id="intro" v-section v-scroll="handleScroll">

    <div class="header header--hg">
      <div class="wrapper">
        <transition name="slideup" v-on:enter="(e)=> addMarquee(e)" v-on:after-leave="removeMarquee">
          <div class="text-container" :key="index">
            <template v-for="i in 4">
              <h1 v-if="index > -1" v-html="data[index].header"/>
            </template>
          </div>
        </transition>
      </div>
    </div>

    <div class="content">
      <div class="texture section">

        <div class="wrapper">
          <transition name="fade">
            <p class="message body--bg" :key="index" v-html=" index > -1 ? data[index].message : ''"/>
          </transition>
        </div>

        <div class="timer navigation--rg">
            <div class="index" >
              <transition name="fade">
              <p :key="index">0{{index > -1 ? index + 1 : 1}}</p>
              </transition>
            </div>
          <div class="bar-container">
            <div class="bar"/>
          </div>
          <p class="count">0{{data.length}}</p>
        </div>

      </div>

      <div class="image">

        <transition name="slideleft">
          <div :key="index" class="img" v-image="index > -1 ? data[index].image : null"/>
        </transition>

        <div class="header header--hg">
          <div class="wrapper">
            <transition name="slideup" v-on:enter="(e)=> addMarquee(e,true)" v-on:after-leave="removeMarquee">
              <div class="text-container" :key="index">
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
    speed: 10
  }),
  watch:{
    ready(){
      let tl = gsap.timeline()
      tl.set('#intro',{opacity:1},0)
      tl.set('#intro .bar',{scaleX:0},0)
      tl.from('#intro .texture',.75,{xPercent:-100, ease: 'power2.out', clearProps: 'all'},0)
      tl.from('#intro .timer',.75,{yPercent: 50, opacity: 0,  ease: 'power4.out'})
      this.next()
    }
  },
  mounted(){
    gsap.set('#intro',{opacity:0})
  },
  methods:{
    handleScroll(e){
      if (e.leave){
        this.marquee.forEach(m => m.gsap.pause())
        gsap.set('#intro .img',{display: 'none'})
        this.timer.pause()
      }
      if (e.enter && e.scroll.direction == 'up'){
        this.marquee.forEach(m => m.gsap.play())
        gsap.set('#intro .img',{clearProps:'display'})
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
    addMarquee(el,inside = false){
      let els = el.childNodes
      if (inside) gsap.set(el,{color: this.data[this.index].color || '#fff'})
      this.marquee.push({
        el: el,
        gsap: gsap.to(els, this.speed, {xPercent: -100, ease: 'none', repeat: -1})
      })
    },
    next(){
      this.index = this.index < this.data.length - 1 ? this.index + 1 : 0
      this.speed = this.data[this.index].header.split('').length * .5
      this.timer = gsap.fromTo('#intro .bar',10,{scaleX:0},{scaleX:1, ease: 'none', onComplete: this.next})
    }
  }
}
</script>

<style lang="scss">

#intro{
  height: 550px;
  position: relative;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  box-sizing: content-box;



  .header{
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

    .text-container{
      transition-delay: .35s;
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

  .content{
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    padding-right: $desktop-margins;
  }



  .texture{
    flex: 1 1 auto;
    position: relative;
    padding-bottom: 0px;
    padding-top: 230px;
    padding-right: 50px;

    .wrapper{
      height: 100%;
      position: relative;
    }

    .message{
      max-width: 700px;
      position: absolute;
      transition-delay: .35s;
      top: 0px;
      left: 0px;
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
    padding: 50px;
    width: 100%;
    max-width: 300px;

    p{
      line-height: 100%;
    }

    .index{
      position: relative;
      flex: 0 0 auto;
      height: 16px;
      width: 16px;

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



  .image{
    flex: 0 0 auto;
    width: $col3;
    overflow: hidden;
    position: relative;
    z-index: 1;

    // ANIMATED
    .img{
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      background-size: cover;
      background-position: center center;
    }

    .header{
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

  .fade-enter{transform: translateY(-20%); opacity: 0}
  .fade-leave-to{transform: translateY(20%); opacity: 0}

  @media (max-width: $tablet){
    .content{
      padding-right: $tablet-margins;
    }
    .image{
      .header{
        right: -$tablet-margins;
      }
    }
  }

  @media (max-width: $mobile){
    height: 80vh;
    .header{
      top: 72px;
      height: 54px;
    }
    .content{
      padding-right: $mobile-margin-right;
      flex-direction: column-reverse;
    }
    .texture{
      padding-top: 6vw;
      padding-right: $mobile-margin-left
    }
    .timer{
      max-width: none;
      width: auto;
      padding: $mobile-margin-left;
      left: 0px;
    }
    .image{
      width: 100%;
      height: 200px;
      .header{
        right: -$mobile-margin-right
      }
    }
  }
}

.touch{
  #intro{
    height: calc(100vh - #{$desktop-nav-height * 2});

    @media (max-width: $tablet){
      height: calc(100vh - #{$tablet-nav-height * 2});
    }

    @media (max-width: $mobile){
      height: calc(100vh - #{$mobile-nav-height * 2});
    }
  }
}
</style>
