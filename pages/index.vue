<template lang="html">
  <main id="home">

    <section id="intro" v-section>
      <split :text="intro.title" tag="h1" textClass="header--bg reveal"/>
      <p class="body--bg" v-html="introDescription"/>
    </section>

    <section id="sizzle" v-section>
      <video-player v-entrance:scale/>
    </section>

    <div class="offerings" v-element="[animateNav, {offsetEnter: '50vh', offsetLeave: '100vh + 100'}]">

      <div class="side-nav">
        <aside class="navigation--rg">
          <h3
            v-for="(link,i) in sideNavLinks"
            :key="i"
            class="link"
            :class="{active: sideNav == link.id}"
            @click="setScrollTo(link.id,link.el)"
            v-html="link.label"
          />
        </aside>
      </div>

      <section id="events" class="offering" v-section v-element="[()=> setNav('events'),{offset: '50vh'}]">
          <section-title :title="events.title"/>
          <div class="circle" v-entrance:scale v-element="parallaxCircle"/>
          <div class="description">
            <p class="bold body--rg" v-html="events.heading" v-entrance:slide/>
            <p class="body--rg" v-html="events.description" v-entrance:slide/>
          </div>
          <div class="gallery">
            <template v-for="(item,i) in events.gallery">
              <card :key="i">
              </card>
            </template>
          </div>
      </section>

      <section id="comms" class="offering" v-section v-element="[()=> setNav('comms'),{offset: '50vh'}]">
          <section-title :title="comms.title"/>
          <div class="circle" v-entrance:scale v-element="parallaxCircle"/>
          <div class="description">
            <p class="bold body--rg" v-html="comms.heading" v-entrance:slide/>
            <p class="body--rg" v-html="comms.description" v-entrance:slide/>
          </div>
          <div class="gallery">
            <template v-for="(item,i) in comms.gallery">
              <card :key="i">
              </card>
            </template>
          </div>
      </section>

      <section id="training" class="offering" v-section v-element="[()=> setNav('training'),{offset: '50vh'}]">
          <section-title :title="training.title"/>
          <div class="circle" v-entrance:scale v-element="parallaxCircle"/>
          <div class="description">
            <p class="bold body--rg" v-html="training.heading" v-entrance:slide/>
            <p class="body--rg" v-html="training.description" v-entrance:slide/>
          </div>
          <div class="gallery">
            <template v-for="(item,i) in training.gallery">
              <card :key="i">
              </card>
            </template>
          </div>
      </section>
    </div>

    <section id="cares" class="full-width" v-section>
      <section-title :title="cares.title"/>
    </section>

    <section id="about" class="full-width" v-section>
      <section-title :title="about.title"/>
    </section>

  </main>
</template>

<script>
import card from '@/components/card'
import videoPlayer from '@/components/videoPlayer'
import sectionTitle from '@/components/sectionTitle'
import data from '@/assets/data/home'
import {mapState} from 'vuex'
export default {
  components:{videoPlayer,sectionTitle, card},
  data:()=>({
    intro: data.intro,
    events: data.events,
    comms: data.comms,
    training: data.training,
    cares: data.cares,
    about: data.about,
    sideNav: null,
    scrollTo: null,
    animations: {}
  }),
  watch:{
    ready(ready){
      if (ready){
        let tl = this.$gsap.timeline({delay: .25})
        tl.to('#intro h1',.7,{yPercent: 0,ease: 'power4.out'},0)
        tl.to('#intro p',1,{yPercent: 0, opacity: 1, ease: 'power4.out'},0)
        tl.set(['#intro h1','#intro p'],{clearProps: 'all'})
      }
    }
  },
  mounted(){
    this.setIntroHover()
    this.setNavAnimation()
    this.$gsap.set('#intro h1',{yPercent: 100})
    this.$gsap.set('#intro p',{opacity:0,yPercent: -50})
  },
  methods:{
    parallaxCircle(e){
      if (e.window.width < 600) return
      this.$gsap.set(e.el,{y: `-=${e.delta * .2}`})
    },
    parallaxEvents(e){
      if (e.window.width < 600) return
      this.$gsap.set(e.el,{y: `-=${e.delta * .15}`})
    },
    animateNav(e){
      this.animations.sideNav.progress(e.percent)
    },
    setNavAnimation(){
      this.animations.sideNav = this.$gsap.timeline({paused: true})
      this.animations.sideNav.to('.side-nav',.5,{xPercent: -100, ease: 'expo.out'},0)
      this.animations.sideNav.to('.side-nav',.5,{xPercent: 0, ease: 'expo.in'},10)
    },
    setIntroHover(){
      let els = document.querySelectorAll('#intro p b')
      els.forEach(el => {
        this.$vb.addMouseElement(el,(e)=>{

          let gif = el.querySelector('img')

          if (e.entering){
            this.$gsap.set(gif,{display: 'block'})
            this.$gsap.from(gif,.25,{scale:0, opacity:0})
          }
          if (e.active){
            this.$gsap.set(gif,{x:e.x, y: e.y})
          }
          if (e.leaving){
            this.$gsap.to(gif,.25,{scale:0, opacity:0})
            this.$gsap.set(gif,{clearProps:'all', display: 'none', delay: .25})
          }
        })
      })
    },
    setScrollTo(id, el){
      this.sideNav = id
      this.scrollTo = id
      this.$vb.scrollTo(el)
    },
    setNav(id){
      if (this.scrollTo && id !== this.scrollTo) return
      this.scrollTo = null
      this.sideNav = id
    }
  },
  computed:{
    ...mapState(['ready']),
    sideNavLinks(){
      return [
        {label:'Training', el: '#training',id:'training'},
        {label:'Communications', el: '#comms',id:'comms'},
        {label:'Events', el: '#events', id:'events'}
      ]
    },
    introDescription(){
      let text = this.intro.description
      this.intro.hover.forEach(h => {
        text = text.replace(h.text,`<b>${h.text}<img src="${h.gif}"/></b>`)
      })
      return text
    }
  }
}
</script>

<style lang="scss">

#home{

  #intro{
    position: relative;
    padding-top: $desktop-section-space / 2;

    .word{
      overflow: hidden;
    }
    p{
      margin: 50px 0px 0px;
      max-width: 800px;
    }

    b{
      color: #1E0FC7;
      font-weight: 400;
      position: relative;
      cursor: pointer;

      &::after{
        content: '';
        position: absolute;
        top: 95%;
        left: 0px;
        right: 0px;
        height: 3px;
        border-radius: 1.5px;
        background: #865be8;
        opacity: .2;
        transition: opacity .25s, transform .25s;
      }
      &:hover{
        &::after{
          opacity: 1;
          transform: translateY(2px);
        }
      }
    }

    img{
      max-height: 200px;
      max-width: 200px;
      position: absolute;
      bottom: 150%;
      right: 0px;
      display: none;
    }
  }

  .offerings{
    .side-nav{
      position: fixed;
      z-index: 50;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
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
          color: #1E0FC7;
        }
      }
    }
    .section-title{
      margin-bottom: 50px;
    }

    .description{
      margin-left: $col4 + $gutter;
      margin-bottom: $desktop-section-space;
    }

    .circle{
      position: absolute;
      top: $desktop-section-space;
      right: -20%;
      width: 60vw;
      height: 60vw;
      border-radius: 50%;
      background-image: url('../static/texture.jpg');
      z-index: -1;
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

  .card:nth-child(8n + 1){
    flex: 0 0 $col8;
    margin-right: $col4 + $gutter;
    .card-container{
      padding-bottom: 110%;
    }
  }

  .card:nth-child(8n + 2),
  .card:nth-child(8n + 8){
    .card-content{
      margin-top: 50%
    }
  }

  .card:nth-child(8n + 4),
  .card:nth-child(8n + 6){
    .card-content{
      margin-top: -50%
    }
  }

  .card:nth-child(8n + 3),
  .card:nth-child(8n + 7){
    margin-right: $gutter;
    margin-left: $gutter;
  }

  .card:nth-child(8n + 5){
    flex: 0 0 $col8;
    margin-left: $col4 + $gutter;
    .card-container{
      padding-bottom: 110%;
    }
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
    &:nth-child(even){
      .card-content{
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
    &:nth-child(even){
      margin-left: $col2 + $gutter;
    }
    &:last-child{
      margin-bottom: 0px;
    }
    .card-container{
      padding-bottom: 50%;
    }
  }
}

#cares{
  margin-top: -200px;
  padding-top: 200 + $desktop-margins;
  background: #1E0FC7;
  z-index: -1;
  hr{
    background: #7b74c7;
  }
  .word{
    color: white;
  }
}

#about{
  background-image: url('../static/texture.jpg');
}





@media (min-width: $widescreen + 100){
  #home{
    #intro{
      p{
        max-width: 1000px;
      }
      img{
        max-width: 300px;
        max-height: 300px;
      }
    }
  }
}

@media (max-width: $tablet){
  #home{
    #sizzle{
      padding-left: 0px;
      padding-right: 0px;
    }

    .offerings{
      .side-nav{
        width: $tablet-margins;
      }
      .description{
        margin-left: $col4;
      }
    }
  }
}

@media (max-width: $mobile){
  #home{
    #intro{
      img{
        max-height: 100px;
        max-width: 100px;
      }
    }

    .offerings{
      .side-nav{
        width: $mobile-margin-right;
      }
      .description{
        margin-left: 0px;
      }
      .circle{
        width: 110vw;
        height: 110vw;
        right: -40vw;
        transform: none !important;
      }

      br{
        display: none;
      }
    }

    .card{
      margin: 0px 0px 20px !important;
      flex: 0 0 100% !important;
      width: 100% !important;
      transform: none !important;
      .card-container{
        padding-bottom: 60vh !important;
        .card-content{
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
  #intro{
    b{
      color: inherit;
      cursor: inherit;
      &::after{
        content: none;
      }
    }
  }
}

</style>
