<template lang="html">
  <main id="home">

    <section id="intro" v-section>
      <split :text="intro.title" tag="h1" textClass="header--bg"/>
      <p class="body--bg" v-html="introDescription"/>
    </section>

    <section id="sizzle" v-section>
      <video-player v-onEnter:scale/>
    </section>

    <div id="offerings" v-element="[handleOfferings, {offsetEnter: '50vh', offsetLeave: '100vh'}]">

      <div class="side-nav">
        <aside class="navigation--rg">
          <h3 class="link" :class="{active: activeOffer == 'events'}" @click="$vb.scrollTo('#events')">Events</h3>
          <h3 class="link" :class="{active: activeOffer == 'comms'}" @click="$vb.scrollTo('#comms')" >Communications</h3>
          <h3 class="link" :class="{active: activeOffer == 'training'}" @click="$vb.scrollTo('#training')">Training</h3>
        </aside>
      </div>

      <section id="events" class="offering" v-section v-element="[handleEvents,{offset: '50vh'}]">
        <section-title :title="events.title"/>
        <div class="circle" v-element="(e)=> animateCircle('events',e)" v-onEnter:scale/>
        <div class="description">
          <p class="bold body--rg" v-html="events.heading" v-onEnter:slideDown/>
          <p class="body--rg" v-html="events.description" v-onEnter:slideDown/>
        </div>
      </section>

      <section id="comms" class="offering" v-section v-element="[handleComms,{offset: '50vh'}]">
        <section-title :title="comms.title"/>
        <div class="circle" v-element="(e)=> animateCircle('comms',e)" v-onEnter:scale/>
        <div class="description">
          <p class="bold body--rg" v-html="comms.heading" v-onEnter:slideDown/>
          <p class="body--rg" v-html="comms.description" v-onEnter:slideDown/>
        </div>
      </section>

      <section id="training" class="offering" v-section v-element="[handleTraining,{offset: '50vh'}]">
        <section-title :title="training.title"/>
        <div class="circle" v-element="(e)=> animateCircle('training',e)" v-onEnter:scale/>
        <div class="description">
          <p class="bold body--rg" v-html="training.heading" v-onEnter:slideDown/>
          <p class="body--rg" v-html="training.description" v-onEnter:slideDown/>
        </div>
      </section>
    </div>

    <section id="cares-overview" class="full-width" v-section/>

  </main>
</template>

<script>
import videoPlayer from '@/components/videoPlayer'
import sectionTitle from '@/components/sectionTitle'
import data from '@/assets/data/home'
export default {
  components:{videoPlayer,sectionTitle},
  data:()=>({
    intro: data.intro,
    events: data.events,
    comms: data.comms,
    training: data.training,
    activeOffer: null
  }),
  mounted(){
    this.handleIntroHover()

    this.$gsap.set('#intro h1',{yPercent: 100})
    this.$gsap.set('#intro p',{opacity:0,yPercent: -50})

    let tl = this.$gsap.timeline({delay: 1})
    tl.to('#intro h1',.7,{yPercent: 0,ease: 'power4.out'},0)
    tl.to('#intro p',1,{yPercent: 0, opacity: 1, ease: 'power4.out'},0)
    tl.set(['#intro h1','#intro p'],{clearProps: 'all'})
  },
  methods:{
    animateCircle(id,e){
      this.$gsap.set(`#${id} .circle`,{y: `-=${e.scroll.delta * .2}`})
    },
    handleEvents(e){
      this.activeOffer = 'events'
    },
    handleComms(e){
      this.activeOffer = 'comms'
    },
    handleTraining(e){
      this.activeOffer = 'training'
    },
    handleOfferings(e){

      switch(e.status){
        case 'enter':
        this.$gsap.to('.side-nav',.5,{xPercent: -100, ease: 'expo.out'})
        break

        case 'leave':
        this.$gsap.to('.side-nav',.5,{xPercent: 0, ease: 'expo.in'})
      }
    },
    handleIntroHover(){
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
  },
  computed:{
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

#intro{
  position: relative;

  .word{
    overflow: hidden;
    h1{
      line-height: 73%;
      padding-bottom: 12px;
    }
  }
  p{
    margin: 50px 0px 0px;
    max-width: 800px;
    b{
      color: #1E0FC7;
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
        background: #1E0FC7;
        opacity: .2;
        transition: opacity .25s, transform .25s;
      }

      &:hover{
        &::after{
          opacity: 1;
          transform: translateY(2px);
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
  }
}

#offerings{

  .side-nav{
    position: fixed;
    z-index: 100;
    left: 100%;
    top: 25%;
    bottom: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: $space--bg;

    aside{
      flex: 0 0 auto;
      transform: rotate(90deg);
      display: flex;
      justify-content: space-between;
    }

    .link{
      cursor: pointer;
      flex: 0 0 auto;
      padding: 10px 15px;
      &.active{
        font-weight: 600;
        color: #1E0FC7;
        letter-spacing: .75px;
      }
    }
  }
  .offering{
    position: relative;
    padding-bottom: 100vh;
  }
  .section-title{
    margin-bottom: $space--md;
  }

  .description{
    margin-left: $col6;
  }

  .circle{
    position: absolute;
    top: $space--bg;
    right: -300px;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    background-image: url('../static/texture.jpg');
    z-index: -1;
  }
}

#cares-overview{
  background: #1E0FC7;
  height: 100vh;
}

@media (max-width: $tablet){

  #sizzle{
    padding-left: 0px;
    padding-right: 0px;
  }

  #offerings{
    .side-nav{
      width: $space--md;
    }
    .description{
      margin-left: $col4;
    }
  }
}

@media (max-width: $mobile){

  #intro {
    p b img{
      max-height: 100px;
      max-width: 100px;
    }
  }

  #offerings{
    .side-nav{
      width: $space--sm;
    }
    .description{
      margin-left: 0px;
    }
    .circle{
      width: 110vw;
      height: 110vw;
      right: -40vw;
    }

    br{
      display: none;
    }
  }
}

.mobile{

  #intro {
    p{
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

</style>
