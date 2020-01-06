<template lang="html">
  <section id="events" v-scroll:section>
    <div class="content">

      <h1 ref="titleTop" class="title top" v-html="data.title[0]" v-scroll="titleTop"/>
      <h1 ref="titleBottom" class="title bottom" v-html="data.title[1]" v-scroll="titleBottom"/>

      <parallax-image class="hero" :image="data.hero" :parallax="-2" />

      <div class="description">
        <p>{{data.description}}</p>
      </div>


    </div>
  </section>
</template>

<script>
import parallaxImage from "@/components/parallaxImage";
import reveal from "@/components/reveal";
export default {
  props: ["data"],
  components: { parallaxImage, reveal },
  data(){
    return{
      stickyDescription: false,
      animations: {}
    }
  },
  mounted(){
    this.animations.title = this.$gsap.to('#events .title.bottom',1,{opacity:0}).pause()
  },
  computed:{
    titleTop(){
      return {
        parallax:[
          {min: 1000, xSpeed:'2.3vw',offset:'40vh'},
          {min: 600, xSpeed:'2.5vw',offset:'40vh'}
        ],
        sticky:[
          {min: 600, position:'60vh', duration:'150vw'},
        ]
      }
    },
    titleBottom(){
      return{
        parallax:[
          {min: 1000, xSpeed:'1.5vw',offset:'40vh'},
          {min: 600, xSpeed:'1.8vw',offset:'40vh'}
        ],
        sticky:[
          {min: 600, position:'60vh',duration:'170vw'}
        ]
      }
    }
  },
  methods:{
    descriptionScroll(e){
      if (e.sticky !== this.stickyDescription ) e.setSticky(!e.sticky)
    }
  }
};
</script>

<style lang="scss">
#events {
  position: relative;
  width: 100vw;
  padding-right: 0px;

  .title{
    font-size: 150px;
    line-height: 110%;
    position: absolute;
    white-space: nowrap;
    left: 100vw;
    padding: 0px 20px;
    top: 0px;

    &.bottom{
      padding-top: 150px;
      z-index: 1
    }

    @media (min-width: 1400px){
      font-size: 12vw;

      &.bottom{
        padding-top: 11vw;
      }
    }
  }

  .hero{
    position: relative;
    width: 100%;
    height: 90vh;
    margin: 15vw 0px 30vw;

    @media (max-width: $mobile){
      height: 100vh;
      margin-bottom: 0px;
      margin-top:0px;
      z-index: -1
    }
  }

  .description{
    @include center;
    justify-content: flex-start;
    position: relative;
    height: 100vh;
    z-index: 1;
    font-size: 35px;
    line-height: 140%;

    p{
      width: 45vw;
      flex: 0 0 auto;
    }

    @media (max-width: $mobile){
      font-size: 25px;
    }
  }

}
</style>
