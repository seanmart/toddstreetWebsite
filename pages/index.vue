<template lang="html">
  <main id="home">

    <section class="intro" v-section>
      <split :text="intro.title" tag="h1" textClass="header--bg reveal"/>
      <p class="body--bg" v-html="introDescription"/>
    </section>

    <section class="sizzle" v-section>
      <video-player v-enter:pop/>
    </section>

    <div class="side-nav" v-resize="setSideNavPosition">
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

    <div v-scroll="[animateSideNav, '50vh', '100vh']">

    <section id="events" v-section v-scroll="()=> setNav('events')">
        <section-title :title="events.title"/>
        <section-circle/>
        <section-description :heading="events.heading" :description="events.description"/>
        <div class="gallery">
          <template v-for="(item,i) in events.gallery">
            <case-study :key="i" :title="item.title" :image="item.image" :link="item.link"/>
          </template>
        </div>
    </section>

    <section id="comms" v-section v-scroll="()=> setNav('comms')">
        <section-title :title="comms.title"/>
        <section-circle/>
        <section-description :heading="comms.heading" :description="comms.description"/>
        <div class="gallery">
          <template v-for="(item,i) in comms.gallery">
            <case-study :key="i"/>
          </template>
        </div>
    </section>

    <section id="training" v-section v-scroll="()=> setNav('training')">
        <section-title :title="training.title"/>
        <section-circle/>
        <section-description :heading="training.heading" :description="training.description"/>
        <div class="gallery">
          <template v-for="(item,i) in training.gallery">
            <case-study :key="i"/>
          </template>
        </div>
    </section>

    </div>

    <section class="cares full-width" v-section>
      <section-title :title="cares.title"/>
    </section>

    <section class="about full-width" v-section>
      <section-title :title="about.title"/>
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
    intro: data.intro,
    events: data.events,
    comms: data.comms,
    training: data.training,
    cares: data.cares,
    about: data.about,
    sideNav: null,
    scrollTo: null,
    animations: {},
    sideNavLinks:[
      {label:'Training', el: '#training',id:'training'},
      {label:'Communications', el: '#comms',id:'comms'},
      {label:'Events', el: '#events', id:'events'}
    ]
  }),
  watch:{
    ready(ready){
      if (ready){
        let tl = this.$gsap.timeline({delay: .25})
        tl.to('.intro h1',.7,{yPercent: 0,ease: 'power4.out',stagger:.05},0)
        tl.to('.intro p',1,{yPercent: 0, opacity: 1, ease: 'power4.out'},0)
        tl.set(['.intro h1','.intro p'],{clearProps: 'all'})
      }
    }
  },
  mounted(){
    this.$gsap.set('.intro h1',{yPercent: 100})
    this.$gsap.set('.intro p',{opacity:0,yPercent: -50})

    let tl = this.$gsap.timeline({paused: true})
    tl.to('.side-nav', .75,{xPercent: -100, ease: 'expo.out'},0)
    tl.to('.side-nav', .75,{xPercent: 0, ease: 'expo.in'},10)
    this.animations.sideNav = tl

    this.setSideNavPosition()

  },
  methods:{
    animateCircle(e){
      if (e.window.width < 600) return
      this.$gsap.set(e.el,{y: `-=${e.delta * .2}`})
    },
    animateSideNav(e){
      this.animations.sideNav.progress(e.percent)
    },
    setScrollTo(id, el){
      this.sideNav = id
      this.scrollTo = id
      this.$vb.scroll.scrollTo(el)
    },
    setNav(id){
      if (this.scrollTo && id !== this.scrollTo) return
      this.scrollTo = null
      this.sideNav = id
    },
    setSideNavPosition(){
      this.$gsap.set('.side-nav',{top: window.innerHeight * .4})
    }
  },
  computed:{
    ...mapState(['ready']),
    introDescription(){
      let text = this.intro.description
      this.intro.hover.forEach(h => {
        text = text.replace(h.text,`<b>${h.text}<img src="${h.gif}"/></b>`)
      })
      return text
    },
    animate(){
      let sideNav = this.$gsap.timeline({paused: true})
      sideNav.to('.side-nav',1,{xPercent: -100, ease: 'expo.out'},0)
      sideNav.to('.side-nav',1,{xPercent: 0, ease: 'expo.in'},10)

      return{
        circle: (e) => {
          if (e.scroll.width < 600) return
          this.$gsap.set(e.el,{y: `-=${e.delta * .2}`})
        },
        sideNav: (e)=> sideNav.progress(e.percent)
      }
    }
  }
}
</script>

<style lang="scss">
#home{

  .intro{
    position: relative;
    padding-top: $desktop-section-space / 1.5;

    .word{
      overflow: hidden;
    }
    p{
      margin: 50px 0px 0px;
      max-width: 800px;
    }

    b{
      color: $blue;
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
        background: $blue;
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
      padding-bottom: 62%;
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
    .intro{
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
      img{
        max-height: 100px;
        max-width: 100px;
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

</style>
