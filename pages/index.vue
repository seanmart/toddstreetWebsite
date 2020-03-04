<template lang="html">
  <div id="home" ref="home">
    <section id="intro" class="container" ref="introContainer" v-scroll:section>

      <div class="content widescreen">
        <h1 class="title" v-html="data.intro.title"/>
        <social class="social"/>
        <div class="mask" v-scroll="videoMaskProps">
          <div class="mask-content container" ref="introMaskContainer">
            <div class="content widescreen">
              <h1 class="title" v-html="data.intro.title" v-scroll="titleProps"/>
            </div>
          </div>
          <video-player
            class="video"
            :image="data.intro.image"
            :wistia="data.intro.wistia"
            :play="playIntroVideo"
            v-scroll="videoProps"
          />
        </div>
      </div>

    </section>

    <div id="capabilities">

      <section id="events" class="container" v-scroll:section>
        <div class="content widescreen">
          <div class="title">
            <h1>We</h1>
            <h1>Produce</h1>
            <h1 v-scroll="{x: -1}">Meaningful</h1>
            <h1>Events</h1>
          </div>
          <div class="circle-container" v-scroll="circleContainerProps">
            <div class="circle" v-scroll="circleProps"/>
          </div>
          <div class="info">
            <p class="description" v-html="data.events.description" v-scroll="descriptionProps"/>
            <div class="side-panel">
              <list :list="data.events.offerings" header="Offerings" v-scroll="listProps"/>
            </div>
          </div>
          <div class="gallery">
            <template v-for="image in eventsImageGallery">
              <div class="gallery-item" :class="image.class" :key="i">
                <div class="gallery-item-content">
                  <div class="image-wrapper">
                    <inner-parallax-image class="image" :image="image.image" :outerParallax="image.parallax"/>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>

      <section id="comms" class="container" v-scroll:section="commsProps">
        <div class="content widescreen">
          <div class="title">
            <h1>We</h1>
            <h1>Create</h1>
            <h1 v-scroll="{x: -1}">Impactful</h1>
            <h1>Communications</h1>
          </div>
          <div class="circle-container" v-scroll="circleContainerProps">
            <div class="circle" v-scroll="circleProps"/>
          </div>
          <div class="info">
            <p class="description" v-html="data.comms.description" v-scroll="descriptionProps"/>
            <div class="side-panel">
              <list :list="data.comms.offerings" header="Offerings" v-scroll="listProps"/>
            </div>
          </div>
          <div class="gallery">
            <template v-for="(image,i) in data.comms.images">
              <div class="gallery-item" :key="i">
                <inner-parallax-image class="image" :image="image"/>
              </div>
            </template>
          </div>
        </div>
      </section>

      <section id="training" class="container" v-scroll:section="trainingProps">
        <div class="content widescreen">
          <div class="title">
            <h1>We</h1>
            <h1>Design</h1>
            <h1 v-scroll="{x: -1}">Elevated</h1>
            <h1>Training</h1>
          </div>
          <div class="circle-container" v-scroll="circleContainerProps">
            <div class="circle" v-scroll="circleProps"/>
          </div>
          <div class="info">
            <p class="description" v-html="data.training.description" v-scroll="descriptionProps"/>
            <div class="side-panel">
              <list :list="data.training.offerings" header="Offerings" v-scroll="listProps"/>
            </div>
          </div>
        </div>
      </section>

    </div>

  </div>
</template>

<script>
import data from '@/assets/data/home'
import videoPlayer from '@/components/video'
import split from '@/components/text/split'
import swap from '@/components/text/swap'
import social from '@/components/menu/social'
import innerParallaxImage from '@/components/image/innerParallax'
import list from '@/components/text/list'
import vars from '@/assets/scss/variables.scss'
export default {
  components:{
    innerParallaxImage,
    videoPlayer,
    split,
    swap,
    social,
    list
  },
  data(){
    return{
      data: data,
      playIntroVideo: true,
    }
  },
  mounted(){
    this.init()
  },
  computed:{
    eventsImageGallery(){
      return data.events.images.map((image,i)=>{
        let index = i % 8 + 1
        return {
          image,
          class: `image-${index}`,
          parallax: [2,3,5,8].indexOf(index) > -1 ? 2 : 0
        }
      })
    },
    videoMaskProps(){
      return{
        y:2,
        onEnter:()=> this.playIntroVideo = true,
        onLeave: ()=> this.playIntroVideo = false
      }
    },
    videoProps(){
      return{
        y:-5
      }
    },
    titleProps(){
      return{
        y: -2
      }
    },
    circleContainerProps(){
      return{
        offsetTop: '30vh',
        onReady:(el) => this.$gsap.set(el, {scale:0}),
        onEnterTop:(el) => this.$gsap.to(el,.5,{scale: 1})
      }
    },
    circleProps(){
      return{
        y:2
      }
    },
    eventsProps(){
      return{
        offsetBottom: '-50vh',
        onEnter: (el)=> this.$gsap.set(this.$refs.home, {background: vars.snow}),
        onLeaveTop: (el)=> this.$gsap.set(this.$refs.home, {background: ''}),
      }
    },
    commsProps(){
      return{
        offsetTop: '50vh',
        offsetBottom: '-50vh',
        onEnter: (el)=> this.$gsap.set(this.$refs.home, {background: vars.sunny}),
        onLeaveTop: (el)=> this.$gsap.set(this.$refs.home, {background: ''}),
      }
    },
    trainingProps(){
      return{
        offsetTop: '50vh',
        offsetBottom: '-50vh',
        onEnter: (el)=> this.$gsap.set(this.$refs.home,{background: vars.training}),
      }
    },
    descriptionProps(){
      return{
        offsetTop: '20vh',
        onReady:(el) => this.$gsap.set(el, {y:100, opacity:0}),
        onEnterTop:(el) => this.$gsap.to(el,1,{y: 0, opacity: 1}),
      }
    },
    listProps(){
      return{
        offsetTop: '20vh',
        onReady:(el) =>{
          this.$gsap.set([this.getClass(el,'list-line')], {width: 0})
          this.$gsap.set([this.getClass(el,'list-text')], {xPercent: -100})
        },
        onEnterTop:(el) => {
          this.$gsap.to(this.getClass(el,'list-line'),.5,{width: '100%',stagger:.07, ease: 'back.out(1)'})
          this.$gsap.to(this.getClass(el,'list-text'),.5,{xPercent: 0,stagger:.07, delay: .1})
        },
      }
    }
  },
  methods:{
    getClass(el, c){
      return el.getElementsByClassName(c)
    },
    init(){
      if (this.$scrollbuddy.isMobile()){
        this.$refs.introContainer.style.height = `${window.innerHeight}px`
        this.$refs.introMaskContainer.style.height = `${window.innerHeight}px`
      }

    }
  }
}
</script>

<style lang="scss">

#home{
  transition: background .5s;
  background: $snow;
  border-color: $snow;
  color: $midnight;

  #intro{
    position: relative;
    height: 100vh;
    &.container{
      padding-top: 0px;
    }


    .title{
      @include font('body huge');
      color: $midnight;
      position: absolute;
      bottom: 0px;
      left: 0px;
      margin-bottom: -1vw;
    }

    .social{
      position: absolute;
      bottom: 0px;
      right: 0px;
      fill: $charcoal;
    }

    .mask{
      overflow: hidden;
      background: $midnight;
      position: absolute;
      top: 0px;
      right: 0px;
      height: 72vh;
      width: 64vw;

      .video{
        position: absolute;
        top: 0px;
        right: 0px;
        width: 100%;
        height: 100%;
        opacity: .6;
      }

      .mask-content{
        position: absolute;
        top: 0px;
        right: -$site-padding;
        width: 100vw;
        height: 100vh;
        &.container{
          padding-top: 0px;
        }

        .title{
          color: white;
        }
        @media (max-width: $tablet){
          right: -$site-padding-tablet;
        }
        @media (max-width: $mobile){
          right: -$site-padding-mobile;
        }
      }
    }
  }

  #capabilities{

    .container{
      padding-top: 25vh;
      padding-bottom: 25vh;
    }

    .title{
      @include font('header huge');
      margin-bottom: $site-padding;
    }

    .circle-container{
      height: 35vw;
      width: 35vw;
      position: absolute;
      top: 5vw;
      right: 5vw;
      z-index: -1;

      .circle{
        height: 100%;
        width: 100%;
        background: white;
        border-radius: 100%;
      }
    }

    .info{
      display: flex;
      flex-direction: row;
      align-items: stretch;
      margin-bottom: 10vw;

      .description{
        flex: 0 0 75%;
        @include font('body big');
        padding-right: $site-padding;
        b{
          font-weight: bold;
        }
        @media (min-width: $max-font){

        }
      }

      .side-panel{
        flex: 1 1 auto;
        position: relative;
        padding-bottom: $site-padding;
        .list{
          color: $midnight;
          h3{
            @include font('header');
          }
          p{
            @include font('body small');
            text-transform: uppercase;
          }
        }
      }
    }

    #events{
      .gallery{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: flex-start;
        margin: 0px -1vw;

        .gallery-item{
          flex: 0 0 auto;
          width: 33.333%;
          padding: 1vw;

          .gallery-item-content{
            height: 100%;
            position: relative;
            height: 35vw;
          }

          .image-wrapper{
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            height: 35vw;
          }

          .image{
            height: 100%;
            width: 100%;
          }

          &.image-1,&.image-6{
            width: 66.666%;

            .gallery-item-content{
              height: 70vw;
            }
            .image-wrapper{
              height: 70vw;
            }
          }

          &.image-2,&.image-3,&.image-5, &.image-8{
            .gallery-item-content{
              height: 17.5vw;
            }
          }

          &.image-4{
            margin-right: 33.333%
          }

          &.image-7{
            margin-left: 33.333%
          }
        }
      }
    }

    #comms {
      .gallery{
        .gallery-item{
          padding: 1vw 0px;

          .image{
            width: 66.666%;
            height: 40vw;
          }
        }
      }
    }
  }

}
</style>
