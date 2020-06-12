<template lang="html">
  <section id="intro" v-section v-scroll="handleScroll">

    <div class="header-container">
      <div class="wrapper">
        <transition :duration="transitionDuration * 1000" v-on:before-enter="setHeader" v-on:before-leave="removeHeader">
          <div class="header header--hg unmasked" :key="index">
            <h1 v-for="i in 4" :key="i" v-html="data[index].header" />
          </div>
        </transition>
      </div>
    </div>

    <div class="wrapper">

      <div class="content-container">

        <div class="content">

          <div class="texture"/>
          <div class="wrapper">

            <transition :duration="transitionDuration * 1000" v-on:before-enter="setMessage" v-on:before-leave="removeMessage">
              <p class="body--bg" :key="index" v-html="data[index].message"/>
            </transition>


            <div class="timer navigation--rg">
              <div class="wrapper">
                <h3 class="left" v-html="`0${index + 1}`"/>
                <div class="bar-container">
                  <div class="bar"/>
                </div>
                <h3 class="right" v-html="`0${data.length}`"/>
              </div>
            </div>

          </div>
        </div>

        <div class="images">
          <div class="wrapper">

            <div class="image" v-for="i in data.length"  :key="i" :class="`image-${i - 1}`" v-image="data[i - 1].image"/>

            <div class="header-container">
              <div class="wrapper">
                <transition :duration="transitionDuration * 1000" v-on:before-enter="setHeader" v-on:before-leave="removeHeader">
                  <div class="header header--hg masked" :key="index">
                    <h1 v-for="i in 4" :key="i" v-html="data[index].header" />
                  </div>
                </transition>
              </div>
            </div>

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
    timerDuration: 10,
    transitionDuration: 1,
    marqueeSpeed: .32,
    index: 0,
    timer: null,
    headers:[]
  }),
  mounted(){
    gsap.set('#intro',{opacity:0})
    gsap.set('#intro h1',{yPercent: 100})
    gsap.set('#intro p',{opacity:0,yPercent: 10})
    gsap.set('#intro .bar',{scaleX:0})

    if (this.$vb.touch && window.innerWidth < 600){
      let header = document.querySelector('header').offsetHeight
      gsap.set('#intro', {height: window.innerHeight - header * 2})
    }
  },
  watch:{
    ready(){

      this.setTimer()
      this.setMarquee(document.querySelector('#intro .unmasked'))
      this.setMarquee(document.querySelector('#intro .masked'))

      let tl = gsap.timeline()

      tl.set('#intro',{opacity:1},0)
      tl.from('#intro .texture',1,{xPercent:-100, ease:'power4.out'},0)
      tl.to('#intro .image-0',1,{xPercent: 100, ease:'power4.out'},.2)
      tl.to('#intro .unmasked h1',1,{yPercent: 0, stagger: .1,ease:'power3.out'},.4)
      tl.to('#intro .masked h1',1,{yPercent: 0, stagger: .1,ease:'power3.out'},.4)
      tl.to('#intro p',1,{yPercent:0, opacity:1,ease:'power3.out' },"<.15")
      tl.from('#intro .timer',1,{yPercent:100, opacity:0, ease: 'power3.out'},"<.15")

    }
  },
  methods:{
    handleScroll(e){
      if (e.leave){
        this.timer.pause()
        this.headers.forEach(m => m.gsap.pause())
      }
      if (e.enter && e.scroll.direction == 'up'){
        this.timer.play()
        this.headers.forEach(m => m.gsap.play())
      }
    },
    removeHeader(el){
      gsap.fromTo(el,this.transitionDuration,{yPercent:0},{yPercent: -100, ease:'power2.out', onComplete:()=>{
        this.removeMarquee(el)
      }})
    },
    setHeader(el){
      gsap.fromTo(el,this.transitionDuration,{yPercent: 100},{yPercent: 0,ease:'power2.out'})
      this.setMarquee(el)
    },
    setMarquee(el){
      let speed = this.data[this.index].header.length * this.marqueeSpeed
      this.headers.push({el, gsap: gsap.to(el.childNodes,speed,{xPercent: -100, repeat: -1, ease: 'none' })})
    },
    removeMarquee(el){
      for (let i = 0; i < this.headers.length; i++){
        if (this.headers[i].el == el){
          this.headers[i].gsap.kill()
          this.headers.splice(i,1)
          return
        }
      }
    },
    setMessage(el){
      gsap.fromTo(el,this.transitionDuration,{y:-50,opacity:0},{y: 0, opacity:1,ease: 'power2.out'})
    },
    removeMessage(el){
      gsap.to(el,this.transitionDuration * .25,{y:25, opacity:0, ease: 'power2.out'})
    },
    setTimer(){
      this.timer = gsap.fromTo('#intro .bar',this.timerDuration,{scaleX:0},{scaleX:1, ease: 'none', onComplete: this.setNext})
    },
    setNext(){
      let index = this.index + 1
      if (index == this.data.length) index = 0
      this.index = index

      this.setImage()
      this.setTimer()
    },
    setImage(){
      let lastIndex = this.index - 1
      if (lastIndex < 0) lastIndex = this.data.length - 1

      let tl = gsap.timeline()
      tl.set(`#intro .image-${this.index}`,{zIndex: 1},0)
      tl.set(`#intro .image-${lastIndex}`,{clearProps:'zIndex'},0)
      tl.to(`#intro .image-${this.index}`,this.transitionDuration,{xPercent: 100, ease: 'power2.out'},0)
      tl.to(`#intro .image-${lastIndex}`,this.transitionDuration,{xPercent: 150, ease: 'power2.out'},0)
      tl.set(`#intro .image-${lastIndex}`,{clearProps:'xPercent'})
    }
  }
}
</script>

<style lang="scss">

  #intro{
    padding-left: 0px;
    padding-top: 0px;
    height: calc(100vh - #{$desktop-section-space});
    min-height: 700px;

    .header-container{
      position: absolute;
      top: 0px;
      right: 0px;
      width: 100vw;
      height: 88px;
      padding: 60px 0px;
      box-sizing: content-box;
      z-index: 1;

      .wrapper{
        overflow: hidden;
      }

      .header{
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      h1{
        flex: 0 0 auto;
        padding: 0px 4vw;
        line-height: 72%;
      }
    }

    .wrapper{
      position: relative;
      height: 100%;
    }

    .content-container{
      height: 100%;
      display: flex;
      flex-direction: row;
    }

    .content{
      padding: 208px 50px 50px $desktop-margins;
      flex: 1 1 auto;
      overflow: hidden;
      position: relative;

      .texture{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 0;
      }

      p{
        position: absolute;
        top: 0px;
        left: 0px;
        max-width: 750px;
        z-index: 1;
      }
    }

    .timer{
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 200px;
      height: 16px;
      z-index: 1;

      .bar-container{
        position: absolute;
        top: 6px;
        bottom: 6px;
        left: 30px;
        right: 30px;
        background: #ddd;

        .bar{
          height: 100%;
          width: 100%;
          background: $blue;
        }
      }

      h3{
        position: absolute;
        top: 0px;
        &.left{left: 0px}
        &.right{right: 0px}
      }
    }

    .images{
      flex: 0 0 $col3;

      .image{
        position: absolute;
        background-size: cover;
        background-position: center center;
        z-index: 0;
        height: 100%;
        width: 100%;
        right: 100%;
        top: 0px;
      }

      .wrapper{
        overflow: hidden;
        z-index: 2;
      }

      .header-container{
        color: white;
        right: -$desktop-margins;
      }
    }


    @media (max-width: $tablet){
      padding-bottom: 0px;
      min-height: 600px;
      height: calc(100vh - #{$tablet-section-space * 2});

      .header-container{
        height: 70px;
      }

      .content{
        padding-top: 190px;
        padding-left: $tablet-margins;
      }

      .images{
        .header-container{
          right: -$tablet-margins;
        }
      }
    }

    @media (max-width: $mobile){
      min-height: 500px;
      height: calc(100vh - #{$mobile-section-space * 2});

      .content-container{
        flex-direction: column-reverse;
      }

      .header-container{
        height: 54px;
        padding: 90px 0px;
      }

      .content{
        padding: $mobile-margin-left;
        height: 100%;
      }

      .timer{
        width: 100%;
      }

      .images{
        flex: 0 0 234px;
        .header-container{
          right: -$mobile-margin-right;
        }
      }
    }
  }

</style>
