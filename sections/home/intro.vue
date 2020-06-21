<template lang="html">
  <section id="intro" ref="intro" class="space--r space--b" data-section>

    <div class="marquee-container">
      <div class="marquee">
        <div class="text-container" v-for="item,i in data" :key="i" :data-marquee="i">
          <h1 v-for="i in 4" :key="i" v-html="item.title"/>
        </div>
      </div>
    </div>

    <div class="wrapper">

      <div class="content-container texture">

          <template v-for="item,i in data" >
            <p :key="i" v-html="item.message" :data-message="i" class="body--font"/>
          </template>

          <div class="timer link--font">
            <span>0{{index + 1}}</span>
            <div class="bar"><div class="inner-bar"/></div>
            <span>0{{data.length}}</span>
          </div>

      </div>

      <div class="image-container">

        <div v-for="item,i in data" :key="i" class="image" :data-image="i" v-image="item.image" v-parallax="-2"/>

        <div class="marquee-container">
          <div class="marquee">
            <div class="text-container" v-for="item,i in data" :key="i" :data-marquee="i">
              <h1 v-for="i in 4" :key="i" v-html="item.title"/>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:['data'],
  data:()=>({
    index: 0,
    start: null
  }),
  computed: mapState(['ready']),
  watch:{
    ready(){
      this.start.play()
    }
  },
  mounted(){

    let duration = 10
    let transition = 1.5
    let move = 100

    let length = this.data.length
    let items = {}

    for (let i = 0; i < length; i++){

      let marquee = this.$refs.intro.querySelectorAll(`[data-marquee='${i}']`)
      let message = this.$refs.intro.querySelectorAll(`[data-message='${i}']`)
      let image = this.$refs.intro.querySelectorAll(`[data-image='${i}']`)
      let title = this.$refs.intro.querySelectorAll(`[data-marquee='${i}'] h1`)
      let next = i == length - 1 ? 0 : i + 1

      items[i] = gsap.timeline({paused: true})
                .fromTo('#intro .inner-bar',duration,{scaleX:0},{scaleX:1, ease: 'none'})
                .add(()=>this.index = i,'<')
                .fromTo(image,transition,{xPercent: 0},{xPercent:100,ease: 'power4.out'},'<')
                .fromTo(title,duration,{x:0},{x: -move * duration, ease: 'none'},'<')
                .fromTo(marquee,transition,{xPercent:0},{yPercent: -100, ease: 'power4.out'},'<.25')
                .fromTo(message,transition,{x: -100, opacity: 0},{x: 0, opacity: 1,ease: 'power4.out'},'<')
                .add(()=>items[next].play(0))
                .to(title,transition,{x: `-=${move * transition}`, ease: 'none'},'<')
                .to(marquee, transition, {yPercent: -200, ease: 'power4.out',clearProps: 'transform'},'<')
                .to(message, transition, {x: 100, opacity: 0, ease: 'power4.out', clearProps: 'transform'},'<')
                .to(image,transition,{xPercent: 200, ease: 'power4.out',clearProps: 'transform'},'<.05')
    }

    this.start = gsap.timeline({paused: true})
                     .fromTo('#intro .content-container',1,{xPercent: -100},{xPercent: 0, ease: 'power4.out'},0)
                     .fromTo(['#intro .timer',],{scale: 0},{scale: 1, ease: 'power4.out', clearProps:'all'},.75)
                     .add(()=> items[0].play(),.4)

    ScrollBuddy.create(this.$refs.intro,{
      //onEnter:()=> items[this.index].play(),
      onLeave: ()=> items[this.index].pause()
    })

  }
}
</script>

<style lang="scss">
#intro{
  position: relative;

  .marquee-container{
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100vw;
    padding: 50px 0px;
    z-index: 1;
  }

  .marquee{
    height: 88px;
    position: relative;
    overflow: hidden;
  }

  .text-container{
    position: absolute;
    top: 100%;
    left: 0px;
    right: 0px;
    display: flex;
    flex-direction: row;
  }

  h1{
    flex: 0 0 auto;
    font-family: 'bebas neue', sans-serif;
    font-size: 100px;
    font-weight: 600;
    letter-spacing: -2px;
    line-height: 73%;
    padding-left:70px;
    padding-bottom: 16px;
  }

  .wrapper{
    height: 500px;
    position: relative;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  .content-container{
    flex: 1 1 auto;
    position: relative;
  }

  p{
    position: absolute;
    top: 188px;
    left: $margin--dk;
    right: 50px;
    opacity: 0;
  }

  .timer{
    position: absolute;
    bottom: 50px;
    right: 50px;
    overflow: hidden;
    width: 250px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .bar{
      flex: 1 1 auto;
      height: 3px;
      background: rgba(0,0,0,.1);
      margin: 0px 20px;
      position: relative;
    }
    .inner-bar{
      width: 100%;
      height: 100%;
      transform: scaleX(0);
      background: $lightBlue;
    }
  }

  .image-container{
    flex: 0 0 250px;
    overflow: hidden;
    position: relative;
    background: white;
    z-index: 2;

    .marquee-container{
      color: white;
      right: -$margin--dk;
    }
  }

  .image{
    position: absolute;
    top: -40%;
    right: 100%;
    width: 100%;
    height: 140%;
    background: black;
    background-size: cover;
    background-position: center center;
  }

  @media (max-width: $tablet){

    .marquee-container{
      padding: 37px 0px;
    }

    .marquee{
      height: 76px;
    }

    h1{
      font-size: 85px;
      padding-left: 35px;
      padding-bottom: 14px;
    }

    p{
      top: 150px;
    }

    .image-container{
      .marquee-container{
        right: -$margin--tb;
      }
    }

    .timer{
      left: $margin--tb;
      width: auto;
    }

    p{
      left: $margin--tb
    }

  }

  @media (max-width: $mobile){

    .marquee-container{
      padding: 62px 0px;
    }

    .marquee{
      height: 62px;
    }

    h1{
      font-size: 70px;
      padding-left: 35px;
      padding-bottom: 12px;
    }

    .wrapper{
      flex-direction: column-reverse;
      height: calc(100vh - #{$space--mb * 2});
      min-height: 500px;
    }

    p{
      left: $margin--mb-left;
      top: $margin--mb-left;
      right: $margin--mb-left;
    }

    .timer{
      left: $margin--mb-left;
      bottom: $margin--mb-left;
      right: $margin--mb-left;
    }

    .image-container{
      flex: 0 0 188px;
      .marquee-container{
        right: -$margin--mb-right;
      }
    }

  }
}
</style>
