<template lang="html">
  <main id="home">

    <section id="intro" v-section>
      <h1 v-html="intro.title"/>
      <p v-html="intro.description"/>
    </section>

    <section id="sizzle" v-section>
      <video-player/>
    </section>

    <div id="offerings" v-element="[handleOfferings, {offsetEnter: '50vh', offsetLeave: '100vh'}]">

      <div class="side-nav">
        <aside>
          <div class="link"><h3 :class="{active: activeOffer == 'events'}">Events</h3></div>
          <div class="link"><h3 :class="{active: activeOffer == 'comms'}">Communications</h3></div>
          <div class="link"><h3 :class="{active: activeOffer == 'training'}">Training</h3></div>
        </aside>
      </div>

      <section id="events" class="offering" v-section v-element="[handleEvents,{offset: '50vh'}]">
        <section-title :title="events.title"/>
        <div class="circle" v-element="(e)=> animateCircle('events',e)"/>
        <div class="description">
          <h3 v-html="events.heading"/>
          <p v-html="events.description"/>
        </div>
      </section>

      <section id="comms" class="offering right" v-section v-element="[handleComms,{offset: '50vh'}]">
        <section-title :title="comms.title"/>
        <div class="circle" v-element="(e)=> animateCircle('comms',e)"/>
        <div class="description">
          <h3 v-html="comms.heading"/>
          <p v-html="comms.description"/>
        </div>
      </section>

      <section id="training" class="offering" v-section v-element="[handleTraining,{offset: '50vh'}]">
        <section-title :title="training.title"/>
        <div class="circle" v-element="(e)=> animateCircle('training',e)"/>
        <div class="description">
          <h3 v-html="training.heading"/>
          <p v-html="training.description"/>
        </div>
      </section>
    </div>

    <section class="test full-width" v-section/>

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
      this.$gsap.set(`#${id} .circle`,{y: `-=${e.scroll.delta * .15}`})
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
    @include headerFont;
    font-size: 80px;
    font-weight: 500;
    letter-spacing: -2px;
    line-height: 90%;
  }
  p{
    font-size: 30px;
    line-height: 140%;
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
      width: 300px;
      display: flex;
      justify-content: space-between;
    }


    h3{
      @include headerFont;
      text-transform: uppercase;
      font-weight: 400;
      letter-spacing: 1px;
      font-size: 18px;
      flex: 0 0 auto;
      &.active{
        font-weight: 600;
        color: #1E0FC7;
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
      margin-left: $col5;
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

    h3{
      @include bodyFont;
      font-size: 32px;
      font-weight: 500;
      line-height: 130%;
      margin-bottom: 30px;
    }

    p{
      @include bodyFont;
      font-size: 25px;
      font-weight: 300;
      line-height: 140%;
      color: #555;
    }

    &.right{
      .description{
        margin-left: 0px;
        margin-right: $col5;
      }
      .circle{
        left: -300px;
        right: auto;
      }
    }
  }
}

.test{
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
      h3{
        font-size: 25px;
      }
      p{
        font-size: 20px;
      }
    }
  }
}

@media (max-width: $mobile){

  #offerings{
    .offering{
      .description{
        margin-left: 0px;
      }
      &.right{
        .description{
          margin-right: 0px;
        }
      }
    }
  }
}

</style>
