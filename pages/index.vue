<template lang="html">
  <div id="home">

    <section class="intro" v-scroll:section>
      <div class="content">

        <div class="title" v-scroll="introTitleProps">
          <div class="title-line" v-for="(line,i) in intro.title.split(`<br/>`)" :key="i">
            <p v-html="line" ref="introTitle"/>
          </div>
        </div>

        <div class="mask" v-scroll="introMaskProps" ref="introMask">
          <div class="video-container" ref="introVideo">
            <video-player class="video" :wistia="intro.wistia" :image="intro.image" :play="toggleIntroVideo"/>
          </div>
          <div class="content-container" v-scroll="introMaskContentProps">

            <div class="title" v-scroll="introTitleProps">
              <div class="title-line" v-for="(line,i) in intro.title.split(`<br/>`)" :key="i">
                <p v-html="line" ref="introTitleMasked"/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <section class="events" v-scroll:section ref="events">
      <div class="container">
        <big-title :text="events.title" :move="3"/>
      </div>
      <div class="images" :style="{height: `${events.images.length * 100}vh`}" v-scroll="eventsImagesProps">
        <div v-for="(img,i) in events.images" :key="i" class="image" :style="bgImg(img)" ref="eventsImage"/>
      </div>
    </section>

    <section class="comms" v-scroll:section>
      <div class="container">
        <big-title :text="comms.title" :move="3"/>
      </div>
    </section>

    <section class="training" v-scroll:section>
      <div class="container">
        <big-title :text="training.title" :move="3"/>
      </div>
    </section>

  </div>
</template>

<script>
import data from '@/assets/data/home'
import bigTitle from '@/components/text/bigTitle'
import videoPlayer from '@/components/video'
import css from '@/assets/scss/variables.scss'
export default {
  components:{bigTitle, videoPlayer},
  data(){
    return{
      intro: data.intro,
      events: data.events,
      comms: data.comms,
      training: data.training,
      toggleIntroVideo: true
    }
  },
  mounted(){
    this.animate()
  },
  computed:{
    introMaskProps(){
      return{
        y: 2,
        onEnter: ()=> this.toggleIntroVideo = true,
        onLeave: ()=> this.toggleIntroVideo = false
      }
    },
    introMaskContentProps(){
      return{
        y: -2
      }
    },
    introTitleProps(){
      return{
        x: -2,
        scale: 1,
      }
    },
    eventsImagesProps(){
      let tl
      return{
        sticky: true,
        duration: '100%y',
        offsetTop: '100vh',
        offsetBottom: '100vh',
        onReady:()=> {
          tl = this.$gsap.timeline({paused: true})
          tl.fromTo(this.$refs.eventsImage,1,{scale: 0},{scale: 1, stagger:.5, ease: 'linear'})
        },
        onScroll:(e)=> {
          tl.progress(e.percent)
        }
      }
    }
  },
  methods:{
    animate(){
      let tl = this.$gsap.timeline({delay: .5})
      tl.fromTo(this.$refs.introMask, 2,{yPercent: -10},{yPercent: 0, ease: 'power4.out'},0)
      tl.fromTo(this.$refs.introVideo, 2,{height:0},{height: '100%', ease: 'power4.out'},"<")
      tl.fromTo(this.$refs.introTitle, 2,{yPercent: 100}, {yPercent: 0, stagger: .2, ease: 'power4.out'},"-=1")
      tl.fromTo(this.$refs.introTitleMasked, 2,{yPercent: 100}, {yPercent: 0, stagger: .2, ease: 'power4.out'},"<")
    },
    bgImg(img){
      return {backgroundImage: `url(${img})`}
    }
  }
}
</script>

<style lang="scss">
#home{

  .title-line{
    overflow: hidden;
  }

  .intro{
    height: 100vh;
    color: $midnight;

    .title{
      position: absolute;
      bottom: $unit;
      right: $unit * 2;
      left: $unit;
      @include font('home intro title')
    }

    .text{
      @include font('body medium');
      position: absolute;
      bottom: $unit;
      left: $unit;
    }

    .mask{
      position: absolute;
      z-index: 1;
      top: $unit;
      right: 0px;
      width: $unit * 6;
      height: 100vh;
      overflow: hidden;

      .title{
        color: white;
      }

      .video-container{
        overflow: hidden;
        background: $midnight;
      }

      .video{
        height: 100vh;
        width: 100%;
        opacity: .5;
      }

      .content-container{
        position: absolute;
        top: -$unit;
        width: 100vw;
        height: 100vh;
        right: 0px;
      }
    }

    @media (max-width: $tablet){


    }

    @media (max-width: $mobile){


    }
  }

  .events{
    padding-top: $unit * 2;

    .images{
      position: relative;
    }

    .image{
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100vh;
      width: 100vw;
      background-size: cover;
    }
  }

  .comms{
    padding-top: $unit * 2;
  }

  .training{
    padding-top: $unit * 2;
  }
}
</style>
