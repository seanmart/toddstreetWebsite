<template lang="html">
  <div id="home" ref="home">
    <section id="intro" ref="introContainer" v-scroll:section>

      <div class="container">
        <div class="content widescreen">
          <p class="title" v-html="data.intro.title"/>
          <social/>
        </div>
      </div>

      <div class="masked-content" v-scroll="maskProps">
          <div class="container" v-scroll="maskContentProps">
            <div class="content widescreen">
              <p class="title" v-html="data.intro.title"/>
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

    </section>


    <div id="capabilities">


      <section id="events" class="container" v-scroll:section>

        <div class="content widescreen">
          <div class="title">
            <h1>We</h1>
            <h1>Produce</h1>
            <h1 v-scroll="capabilitiesTitleProps">Meaningful</h1>
            <h1>Events</h1>
          </div>
          <div class="info">
            <p class="description" v-html="data.events.description" v-scroll="descriptionProps"/>
            <div class="side-panel">
              <list :list="data.events.offerings" header="Offerings" v-scroll="listProps"/>
            </div>
          </div>
          <div class="gallery">
            <template v-for="(image,i) in eventsImageGallery">
              <div class="gallery-item" :class="image.class" :key="i">
                <div class="gallery-item-content">
                  <div class="image-wrapper">
                    <inner-parallax-image class="image" :image="image.image" :vScroll="image.vScroll"/>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>


      <section id="comms" v-scroll:section="commsProps">

        <div class="container">
          <div class="content widescreen">
            <div class="title">
              <h1>We</h1>
              <h1>Create</h1>
              <h1 v-scroll="capabilitiesTitleProps">Impactful</h1>
              <h1>Communications</h1>
            </div>
            <div class="info">
              <p class="description" v-html="data.comms.description" v-scroll="descriptionProps"/>
              <div class="side-panel">
                <list :list="data.comms.offerings" header="Offerings" v-scroll="listProps"/>
              </div>
            </div>
            <div class="examples">
              <div class="side" v-scroll="commsSideProps" :style="{marginTop: '5vw' }">
                <div class="example-item">
                  <div class="example-item-content">
                    <img class="tablet" :src="data.comms.tablet" alt="">
                  </div>
                </div>
                <div class="example-item">
                  <div class="example-item-content">
                    <img class="phone" ref="phoneLeft" :src="data.comms.phones.phone1" v-scroll="commsPhoneLeft">
                    <img class="phone" :src="data.comms.phones.phone2" >
                    <img class="phone" ref="phoneRight" :src="data.comms.phones.phone3" v-scroll="commsPhoneRight">
                  </div>
                </div>
              </div>
              <div class="side">
                <div class="example-item">
                  <div class="example-item-content">
                    print
                  </div>
                </div>
                <div class="example-item">
                  <div class="example-item-content">
                    <img class="vertical" :src="data.comms.verticals.vertical1" v-scroll="commsVerticalLeft">
                    <img class="vertical" :src="data.comms.verticals.vertical2" v-scroll="commsVerticalRight">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="videos">

        </div>

      </section>


      <section id="training" class="container" v-scroll:section="trainingProps">

        <div class="content widescreen">
          <div class="title">
            <h1>We</h1>
            <h1>Design</h1>
            <h1 v-scroll="capabilitiesTitleProps">Elevated</h1>
            <h1>Training</h1>
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
      vars: vars,
      playIntroVideo: true,
      animations:{}
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
          vScroll:{
            y: [2,3,5,8].indexOf(index) > -1 ? 2 : 0,
            onResize: (w,h) => {
              if (w < parseInt(vars.mobile)) return {y: 0}
            }
          }
        }
      })
    },
    capabilitiesTitleProps(){
      return{
        x: -1,
        onResize: (w,h)=> {
          if (w < parseInt(vars.mobile)) return {x: 0}
        }
      }
    },
    maskProps(){
      return{
        y:3,
        onEnter:()=> this.playIntroVideo = true,
        onLeave: ()=> this.playIntroVideo = false
      }
    },
    maskContentProps(){
      return{
        y: -3
      }
    },
    videoProps(){
      return{
        y:-5
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
          this.$gsap.set([this.getClass(el,'list-header')], {yPercent: -110})
        },
        onEnterTop:(el) => {
          this.$gsap.to(this.getClass(el,'list-line'),.5,{width: '100%',stagger:.07, ease: 'back.out(1)'})
          this.$gsap.to(this.getClass(el,'list-text'),.5,{xPercent: 0,stagger:.07, delay: .1})
          this.$gsap.to(this.getClass(el,'list-header'),.5,{yPercent: 0})
        },
      }
    },
    commsSideProps(){
      return{
        y:3,
        onResize: (w,h)=> {
          if (w < parseInt(vars.mobile)) return {y: 0}
        }
      }
    },
    commsPhoneLeft(){
      return{
        x: 1.75,
        rotate:-.1,
        offsetTop:-200,
        onResize: (w,h)=> {
          if (w < parseInt(vars.mobile)) return {x: .7}
        }
      }
    },
    commsPhoneRight(){

      return{
        x: -1.75,
        rotate:.1,
        offsetTop:-200,
        onResize: (w,h)=> {
          if (w < parseInt(vars.mobile)) return {x: -.7}
        }
      }
    },
    commsVerticalLeft(){
      return{
        x:.1
      }
    },
    commsVerticalRight(){
      return{
        x:-.1
      }
    }
  },
  methods:{
    getClass(el, c){
      return el.getElementsByClassName(c)
    },
    init(){
      if (this.$scrollbuddy.isMobile()){
        //this.$refs.introContainer.style.height = `${window.innerHeight}px`
        //this.$refs.introMaskContainer.style.height = `${window.innerHeight}px`
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

    .container{
      height: 100%;
    }

    .title{
      @include font('body huge');
      color: $midnight;
      position: absolute;
      bottom: 0px;
      left: 0px;
      font-size: 50px;
      margin-bottom: 30px;

      @media (max-width: 850px) and (min-width: $mobile + 1){
        font-size: 34px;
      }

      @media (max-width: $mobile){
        bottom: 50vh;
        margin-bottom: 0px;
      }
    }

    .social{
      position: absolute;
      bottom: 0px;
      right: 0px;
      fill: $charcoal;
      @media (max-width: $mobile){
        display: none;
      }
    }

    .masked-content{
      z-index: 1;
      background: $midnight;
      position: absolute;
      top: $site-padding;
      right: $site-padding;
      left: 403px;
      bottom: 196px;
      overflow: hidden;

      .container{
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: -$site-padding;
        right: -$site-padding;
      }

      .title{
        z-index: 1;
        color: white;
      }

      .video{
        z-index: -1;
        opacity: .5;
        position: absolute;
        top: -$site-padding;
        left: 0px;
        bottom: 0px;
        right: 0px;
      }

      @media (max-width: $tablet){
        top: $site-padding-tablet;
        right: $site-padding-tablet;
        left: 373px;
        bottom: 165px;

        .container{
          top: -$site-padding-tablet;
          right: -$site-padding-tablet;
        }

        .video{
          top: -$site-padding-tablet
        }
      }

      @media (max-width: 850px){
        top: 145px;
        left: 277px;
        bottom: 145px;

        .container{
          top: -145px;
        }
      }

      @media (max-width: $mobile){
        top: 50vh;
        bottom: 10vh;
        left: 0px;
        right: $site-padding-mobile;

        .container{
          top: -50vh;
          bottom: -10vh;
          right: -$site-padding-mobile;
        }

        .video{
          top: -20vh;
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
      margin-bottom: 5vw;
    }

    .circle-container{
      height: 35vw;
      width: 35vw;
      position: absolute;
      top: 0px;
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
      }

      .side-panel{
        flex: 1 1 auto;
        position: relative;
        padding-bottom: $site-padding;
      }

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

    @media (max-width: $mobile){

      .title{
        margin-bottom: 10vw;
      }

      .info{
        flex-direction: column;

        .description{
          padding: 0px;
          margin-bottom: 10vw
        }

        .list{
          p{
            @include font('body');
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
        margin: 0px -.5vw;

        .gallery-item{

          flex: 0 0 auto;
          width: 100%;
          padding: .5vw 0px;

          .gallery-item-content{
            height: 130vw;
            position: relative;
          }

          .image-wrapper{
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            height: 100%;
          }

          .image{
            height: 100%;
            width: 100%;
          }

          @media (min-width: $mobile + 1){
            width: 33.333%;
            padding: .5vw;

            .gallery-item-content{
              height: 35vw;
            }

            .image-wrapper{
              height: 35vw;
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
                height: 10vw;
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
    }

    #comms{

      .info{
        margin-bottom: 20vw;
      }

      .examples{
        display: flex;
        flex-direction: row;
        margin: 0px -.5vw;

        .side{
          flex: 1 1 50%;
        }

        .example-item{
          width: 100%;
          height: 40vw;
          padding: .5vw;

          .example-item-content{
            height: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .tablet{
            width: 100%;
          }

          .phone{
            height: 70%;
            position: absolute;
          }

          .vertical{
            height: 100%;
            margin: 0px .5vw;
          }
        }
        @media (max-width: $mobile){
          flex-direction: column;

          .side{
            flex: 0 0 auto;
          }

          .example-item{
            height: 50vh;
          }
        }
      }
    }
  }

}
</style>
