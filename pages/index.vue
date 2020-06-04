<template lang="html">
  <main id="home">

    <section class="intro full-width" v-section v-scroll="toggleIntro">

        <div class="header-container" :class="{play: intro.play}">
          <div class="header-wrapper">
            <transition name="intro-header">
              <div class="header header--hg" :key="intro.index">
                <h1 v-for="i in 4" :key="i" :style="{animationDuration: intro.speed + 's'}">
                  {{data.intro[intro.index].header}}
                </h1>
              </div>
            </transition>
          </div>
        </div>

        <div class="box texture">
            <div class="bar"/>
        </div>

        <div class="inner-section">
          <div class="message">
            <transition name="intro-message">
              <p class="body--bg" :key="intro.index" v-html="data.intro[intro.index].message"/>
            </transition>
          </div>
        </div>

    </section>

    <section class="sizzle" v-section>
      <video-player :videoId="data.sizzle.videoId" v-enter:pop/>
    </section>

    <div class="side-nav">
      <aside class="navigation--rg">
        <h3
          v-for="(link,i) in nav.links"
          :key="i"
          class="link"
          :class="{active: nav.active == link.id}"
          @click="setNavScroll(link.id,link.el)"
          v-html="link.label"
        />
      </aside>
    </div>

    <div v-scroll="[animateNav, '50vh', '100vh']">

    <section id="events" v-section v-scroll="()=> setNavActive('events')">
        <section-title :title="data.events.title"/>
        <section-circle/>
        <section-description :heading="data.events.heading" :description="data.events.description"/>
        <div class="gallery">
          <template v-for="(item,i) in data.events.gallery">
            <case-study :key="i" :title="item.title" :image="item.image" :link="item.link"/>
          </template>
        </div>
    </section>

    <section id="comms" v-section v-scroll="()=> setNavActive('comms')">
        <section-title :title="data.comms.title"/>
        <section-circle/>
        <section-description :heading="data.comms.heading" :description="data.comms.description"/>
        <div class="gallery">
          <template v-for="(item,i) in data.comms.gallery">
            <case-study :key="i" :title="item.title" :color="item.color" :link="item.link">
              <img v-if="item.image" :src="item.image"/>
            </case-study>
          </template>
        </div>
    </section>

    <section id="training" v-section v-scroll="()=> setNavActive('training')">
        <section-title :title="data.training.title"/>
        <section-circle/>
        <section-description :heading="data.training.heading" :description="data.training.description"/>
        <div class="gallery">
          <template v-for="(item,i) in data.training.gallery">
            <case-study :key="i" :title="item.title" :image="item.image" :link="item.link"/>
          </template>
        </div>
    </section>

    </div>

    <section class="cares full-width" v-section>
      <section-title :title="data.cares.title"/>
    </section>

    <section class="about full-width" v-section>
      <section-title :title="data.about.title"/>
    </section>

  </main>
</template>

<script>
import caseStudy from '@/components/card/caseStudy'
import videoPlayer from '@/components/videoPlayer'
import sectionTitle from '@/components/sectionTitle'
import sectionDescription from '@/components/sectionDescription'
import sectionCircle from '@/components/sectionCircle'
import data from '@/assets/data/home'
import {mapState} from 'vuex'
export default {
  components:{
    videoPlayer,
    sectionTitle,
    sectionDescription,
    sectionCircle,
    caseStudy
  },
  data:()=>({
    data: data,
    intro:{
      animation: null,
      play: false,
      speed: data.intro[0].header.split('').length * .4,
      index: 0
    },
    nav:{
      scroll: null,
      active: null,
      animation: null,
      links:[
        {label:'Training', el: '#training',id:'training'},
        {label:'Communications', el: '#comms',id:'comms'},
        {label:'Events', el: '#events', id:'events'}
      ]
    }
  }),
  head(){
    return{
      title: 'home – toddstreet'
    }
  },
  watch:{
    ready(ready){
      if (ready){
        this.initIntro()
      }
    }
  },
  mounted(){
    this.initNav()
  },
  destroyed(){
    this.intro.animation.kill()
  },
  methods:{

    // INTRO
    initIntro(){

      if (this.$vb.touch) gsap.set('#home .intro',{height: window.innerHeight - 200})

      let tl = gsap.timeline()
      this.intro.play = true
      tl.set('#home .intro',{opacity:1})
      tl.set('#home .intro .bar',{scaleX: 0})
      tl.fromTo('#home .intro .box',2,{xPercent: -100},{xPercent: 0, ease: 'power4.out'})
      tl.fromTo('#home .intro p',.5,{scale:.5,opacity:0},{scale:1,opacity:1, clearProps: 'all'},.25)
      tl.fromTo('#home .intro .header-wrapper',.5,{yPercent:100},{yPercent: 0,clearProps: 'all'},.25)

      this.startIntroAnimation()

    },
    nextIntro(){
      this.intro.index = this.intro.index < data.intro.length - 1 ? this.intro.index + 1 : 0
      this.intro.speed = data.intro[this.intro.index].header.split('').length * .4
      if (this.intro.play) this.startIntroAnimation()
    },
    toggleIntro(e){
      if (e.leave) {
        this.intro.play = false
        this.intro.animation.pause()
      }
      if (e.enter) {
        this.intro.play = true
        this.intro.animation.play()
      }
    },
    startIntroAnimation(){
      this.intro.animation = gsap.fromTo('#home .intro .bar',10,{scaleX:0},{scaleX:1,ease: 'none',onComplete:this.nextIntro})
    },

    //NAV
    initNav(){
      let tl = gsap.timeline({paused: true})
      tl.to('.side-nav', .75,{xPercent: -100, ease: 'expo.out'},0)
      tl.to('.side-nav', .75,{xPercent: 0, ease: 'expo.in'},10)
      this.nav.animation = tl

      if (this.$vb.touch){
        let percent = window.innerWidth < 600 ? .45 : .5
        gsap.set('.side-nav',{top: window.innerHeight * percent})
      }
    },
    setNavActive(id){
      if (this.nav.scroll && id !== this.nav.active) return
      this.nav.scroll = null
      this.nav.active = id
    },
    setNavScroll(id, el){
      this.nav.active = id
      this.nav.scroll = id
      this.$vb.scroll.scrollTo(el)
    },
    animateNav(e){
      this.nav.animation.progress(e.percent)
    },
    animateCircle(e){
      if (e.window.width < 600) return
      gsap.set(e.el,{y: `-=${e.delta * .2}`})
    }
  },
  computed:mapState(['ready'])
}
</script>

<style lang="scss">
#home{

  .intro{
    position: relative;
    padding-top: 0px;
    height: 550px;
    opacity: 0;

    .header-container{
      top: 75px;
      left: 0px;
      width: 100vw;
      position: absolute;
      z-index: 1;
      overflow: hidden;
      &.play{
        h1{
          animation-name: marquee;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      }

      .header-wrapper{
        position: relative;
        height: 120px;
      }

      .header{
        height: 120px;
        position: absolute;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: flex-start;
        padding: 0px 100px;
      }

      h1{
        padding-left: 50px;
        flex: 0 0 auto;
        white-space: nowrap;
      }
    }

    .box{
      transform-origin: left;
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      width: 550px;
      max-width: 80vw;

      .bar{
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        background: $blue;
        height: 15px;
        transform-origin: left;
      }
    }

    .message{
      position: relative;
      width: 100%;

      p{
        position: absolute;
        top: 100px;
        width: 700px;
        max-width: 80vw;
      }
    }
  }

  .intro-header-enter{
    transform: translateY(100%);
  }

  .intro-header-leave-to{
    transform: translateY(-100%);
  }

  .intro-message-enter{
    transform: translateX(-50px);
  }

  .intro-message-leave-to{
    transform: translateX(50px);
  }


  .intro-message-enter,
  .intro-message-leave-to{
    opacity: 0;
  }

  .intro-message-enter-active, .intro-message-leave-active{
    transition: .6s;
  }
  .intro-header-enter-active, .intro-header-leave-active {
    transition: .6s;
  }

  .side-nav{
    position: fixed;
    top: 50%;
    z-index: 50;
    left: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: $desktop-margins;

    aside{
      flex: 0 0 auto;
      transform: rotate(-90deg);
      display: flex;
      justify-content: space-between;
    }

    .link{
      cursor: pointer;
      flex: 1 1 auto;
      padding: 10px 15px;
      position: relative;
      &.active{
        color: $blue;
      }
    }
  }
}

#events{
  .gallery{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card{
    flex: 0 0 $col4;
    margin-bottom: $gutter;
    .card-container{
      padding-bottom: 130%;
    }
  }

  .card:nth-child(8n + 1),
  .card:nth-child(8n + 5){
    flex: 0 0 $col8;
    .card-container{
      padding-bottom: 80%;
    }
  }

  .card:nth-child(8n + 1){
    margin-right: $col4 + $gutter;
  }

  .card:nth-child(8n + 2),
  .card:nth-child(8n + 8){
    .case-study{
      margin-top: 50%
    }
  }

  .card:nth-child(8n + 4),
  .card:nth-child(8n + 6){
    .case-study{
      margin-top: -50%
    }
  }

  .card:nth-child(8n + 3),
  .card:nth-child(8n + 7){
    margin-right: $gutter;
    margin-left: $gutter;
  }

  .card:nth-child(8n + 5){
    margin-left: $col4 + $gutter;
  }
}

#comms{
  .gallery{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card{
    flex: 0 0 $col6;
    margin-bottom: $gutter;
    .card-container{
      padding-bottom: 90%;
    }

    img{
      flex: 0 0 auto;
      width: 80%;
    }

    &:nth-child(even){
      .case-study{
        margin-top: 20%;
      }
    }
  }

  .card:nth-child(odd){
    margin-right: $gutter;
  }
}

#training{
  padding-bottom: 0px;

  .gallery{
    display: flex;
    flex-direction: column;
  }
  .card{
    flex: 0 0 auto;
    width: $col10;
    margin-bottom: $gutter;
    .card-container{
      padding-bottom: 50%;
    }

    &:nth-child(even){
      margin-left: $col2 + $gutter;
    }
    &:last-child{
      margin-bottom: 0px;
    }
  }
}

#home{
  .cares{
    margin-top: -200px;
    padding-top: 200 + $desktop-margins;
    background: $blue;
    z-index: -1;
    hr{
      background: $lightBlue;
    }
    .word{
      color: white;
    }
  }

  .about{
    background-image: url('../static/texture.jpg');
  }
}





@media (min-width: $widescreen + 100){
  #home{

  }
}

@media (max-width: $tablet){
  #home{
    .sizzle{
      padding-left: 0px;
      padding-right: 0px;
    }

    .side-nav{
      width: $tablet-margins;
    }
  }
}

@media (max-width: $mobile){

  #home{

    .intro{
      .header-container{
        top: 50px;
        .header{
          padding: 0px 30px;
        }
        h1{
          padding-left: 30px;
        }
      }
      .message{
        p{
          top: 50px;
        }
      }
      .box{
        width: auto;
        right: 100px;
      }
    }

    .side-nav{
      width: $mobile-margin-right;
    }

    .card{
      margin: 0px 0px 20px !important;
      flex: 0 0 100% !important;
      width: 100% !important;
      transform: none !important;
      .card-container{
        padding-bottom: 60vh !important;
        .case-study{
          margin: 0px !important;
        }
      }
    }
    .cares{
      padding-top: 200 + $tablet-margins;
    }
  }

}

.touch{
  #home{
    .intro{
      b{
        color: inherit;
        cursor: inherit;
        &::after{
          content: none;
        }
      }
    }
  }
}

@media screen and (orientation:landscape)
and (max-device-width: $mobile) {
  .side-nav{
    display: none;
  }
}

</style>
