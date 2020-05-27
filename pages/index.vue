<template lang="html">
  <main id="home">

    <section id="intro" v-section>
      <h1 class="header--bg" v-html="intro.title"/>
      <p class="body--bg" v-html="intro.description"/>
    </section>

    <section id="sizzle" v-section>
      <video-player/>
    </section>

    <div id="offerings" v-element="[handleOfferings, {offsetEnter: '50vh', offsetLeave: '100vh'}]">

      <div class="side-nav">
        <aside class="navigation--rg">
          <h3 :class="{active: activeOffer == 'events'}" @click="$vb.scrollTo('#events')">Events</h3>
          <h3 :class="{active: activeOffer == 'comms'}" @click="$vb.scrollTo('#comms')" >Communications</h3>
          <h3 :class="{active: activeOffer == 'training'}" @click="$vb.scrollTo('#training')">Training</h3>
        </aside>
      </div>

      <section id="events" class="offering" v-section v-element="[handleEvents,{offset: '50vh'}]">
        <section-title :title="events.title"/>
        <div class="circle" v-element="(e)=> animateCircle('events',e)"/>
        <div class="description">
          <h3 class="body--md" v-html="events.heading"/>
          <p class="body--md" v-html="events.description"/>
        </div>
      </section>

      <section id="comms" class="offering" v-section v-element="[handleComms,{offset: '50vh'}]">
        <section-title :title="comms.title"/>
        <div class="circle" v-element="(e)=> animateCircle('comms',e)"/>
        <div class="description">
          <h3 class="body--md" v-html="comms.heading"/>
          <p class="body--md" v-html="comms.description"/>
        </div>
      </section>

      <section id="training" class="offering" v-section v-element="[handleTraining,{offset: '50vh'}]">
        <section-title :title="training.title"/>
        <div class="circle" v-element="(e)=> animateCircle('training',e)"/>
        <div class="description">
          <h3 class="body--md" v-html="training.heading"/>
          <p class="body--md" v-html="training.description"/>
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
    }
  }
}
</script>

<style lang="scss">

#intro{
  h1{
    margin-bottom: 50px;
  }
  p{
    max-width: 800px;
    color: #555;
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

    h3{
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
      max-width: 110vw;
      max-height: 110vw;
      border-radius: 50%;
      background-image: url('../static/texture.jpg');
      z-index: -1;
    }

    h3{
      margin-bottom: 30px;
      font-weight: 500;
    }

    p{
      color: #555;
    }

  }
}

#cares-overview{
  background: #1E0FC7;
  height: 100vh;
}

@media (max-width: $tablet){

  #offerings{
    .side-nav{
      width: $space--md;
    }
    .offering{
      .description{
        margin-left: $col4;
      }
      &.right{
        .description{
          margin-right: $col4;
        }
      }
    }
  }
}

@media (max-width: $mobile){

  #sizzle{
    padding-left: 0px;
    padding-right: 0px;
  }

  #offerings{
    .side-nav{
      width: $space--sm;
    }
    .offering{
      .description{
        margin-left: 0px;
      }

      h3 br{
        display: none;
      }
    }
  }
}

</style>
