<template lang="html">
  <section id="intro" v-scroll:section="{onChange: toggleVideo}">

    <div class="content">
      <div class="top">
        <reveal :play="ready" opposite class="logo" v-scroll="{parallax: {speed: 2},onChange: toggleNav}">
          <logo/>
        </reveal>
      </div>

      <reveal :play="ready" class="text">
        <p v-for="(line, i) in data.text" :key="i" v-html="line"/>
      </reveal>
    </div>

    <div class="menu">

      <reveal class="top hire" :play="ready" :delay=".5" opposite side>
        <nuxt-link to="/">Hire Us</nuxt-link>
      </reveal>

      <div class="label" v-scroll="{parallax:{speed: 1}}">
        <reveal :play="ready" :delay=".5" ><p>Explore</p></reveal>
        <reveal class="line-container" :play="ready" :delay="1" side><div class="line"/></reveal>
      </div>



      <reveal :play="ready" :delay=".5" class="links">
        <nuxt-link v-for="(link, i) in navData.links" :key="i" :to="link.path" class="link">
          <h3>{{link.label}}</h3>
        </nuxt-link>
      </reveal>

      <div class="info" v-scroll="{parallax:{speed: -1}}">

        <reveal :play="ready" :delay="1" class="address">
          <p v-for="line in navData.address">{{line}}</p>
        </reveal>

        <div class="social">
          <reveal :play="ready" :delay="1" side horizontal>
            <a v-for="item in navData.social" :href="item.link">
              <icons :icon="item.icon"/>
            </a>
          </reveal>
        </div>

      </div>
    </div>

    <fullscreen-video
    class="video"
    videoId="5k71u7zdpe"
    :play="ready"
    :hide="hideVideo"
    v-scroll="{parallax:{speed: -5}}"
    />

  </section>
</template>

<script>
import reveal from "@/components/reveal";
import fullscreenVideo from "@/components/fullscreenVideo";
import logo from '@/components/logo'
import icons from '@/components/icons'
import navData from '@/assets/data/nav'
import { mapState } from "vuex";
export default {
  props: ["data"],
  components: { reveal, fullscreenVideo, logo, icons },
  data(){
    return{
      navData: navData,
      hideVideo: false,
      fadeVideo: null
    }
  },
  mounted(){
    this.$gsap.set('#intro .video', {opacity: 0})
    this.fadeVideo = this.$gsap.to('#intro .video', 1,{opacity:0}).pause()
  },
  computed: mapState(["ready"]),
  watch: {
    ready(r) {
      r && this.$gsap.to("#intro .video", 5, { opacity: 0.3 });
    }
  },
  methods:{
    toggleVideo(e){
      this.hideVideo = !e.visible
    },
    toggleNav(e){
      this.$store.commit('setNav', !e.visible)
    }
  }
};
</script>

<style lang="scss">
#intro {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  min-height: 800px;

  @media (max-width: $mobile){
    min-height: inherit;
  }

  .top{
    height: 13vw;
    max-height: 180px;
  }

  .content{
    flex: 1 1 auto;

    @media (max-width: $mobile){
      @include center
    }

    .logo{

      svg{
        fill: $snow;
        width: 25vw;
        min-width: 200px;
        max-width: 350px;
      }

      @media (max-width: $mobile){
        display: none;
      }

    }

    .text{
      font-size: 35px;
      line-height: 140%;

      p{
        font-weight: 200;
      }

      @media (max-width: $tablet){
        font-size: 3.35vw;
      }

      @media (max-width: $mobile){
        font-size: 25px;
      }
    }
  }


  .menu{
    flex: 0 0 auto;

    @media (max-width: $mobile){
      display: none;
    }

    .hire{
      text-align: right;
    }
    .label{
      display: block;
      position: relative;
      padding: 10px 0px;

      .line-container{
        position: absolute;
        bottom: 0px;
        width: 100%;

        .line{
          border-bottom: 1px solid rgba($snow, .2);
          height: 1px;
          width: 100%;
        }
      }
    }

    .links{
      padding: 40px 0px 30px;
    }

    .link{
      font-size: 40px;
      line-height: 140%;

      h3{
        transition: transform .25s;
        display: block;
      }

      &:hover h3{
        transform: translateX(5%);
      }

      @media (max-width: $tablet){
        font-size: 3.7vw;
      }
    }

    .info{
      display: flex;

      @media (max-width: 1100px){
        flex-direction: column;
      }

      .address{
        flex: 0 0 auto;
        padding: 8px;
        padding-left: 0px;

        p{
          white-space: nowrap;
          line-height: 150%;
        }
      }

      .social{
        flex: 1 1 auto;
        text-align: right;
        margin-left: 40px;

        @media (max-width: 1100px){
          margin-left: -10px;
          text-align: left;
          margin-top: 40px;
        }

        a{
          display: inline-block;
          padding: 10px;
        }

        svg{
          height: 20px;
          fill: $snow
        }
      }
    }

  }


  .video {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
  }

}
</style>
