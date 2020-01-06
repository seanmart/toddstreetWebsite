<template lang="html">
  <section id="intro" v-scroll:section="{onChange: toggleVideo}">

    <div class="content">
      <div class="top">
        <reveal :play="ready" opposite class="logo" v-scroll="{parallax:{ySpeed:5},onChange: toggleNav}">
          <logo/>
        </reveal>
      </div>

      <reveal :play="ready" class="text">
        <p v-for="(line, i) in data.text" :key="i" v-html="line"/>
      </reveal>
    </div>

    <div class="menu">

      <div class="top">
        <reveal class="hire-us" :play="ready" :delay=".5" opposite side>
          <nuxt-link to="/">Hire Us</nuxt-link>
        </reveal>
      </div>

      <div class="label" v-scroll="{parallax:{ySpeed:1}}">
        <reveal :play="ready" opposite :delay=".5" ><p>Explore</p></reveal>
        <reveal class="line-container" :play="ready" :delay="1" side><div class="line"/></reveal>
      </div>



      <reveal :play="ready" :delay=".5" class="links">
        <nuxt-link v-for="(link, i) in navData.links" :key="i" :to="link.path" class="link">
          <h3>{{link.label}}</h3>
        </nuxt-link>
      </reveal>

      <div class="info" v-scroll="{parallax:{ySpeed:-1}}">

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
    play
    class="video"
    videoId="mpl8lcc842"
    :hide="hideVideo"
    v-scroll="{parallax:{ySpeed:-5}}"
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
    },
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

  .top{
    @include padding(false, false, false, true);
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .content{
    flex: 1 1 auto;
  }

  .logo{
    svg{
      fill: $snow;
      height: 4vw;
      min-height: 20px;
      max-height: 80px;
    }
  }

  .menu{
    flex: 0 0 auto;
    .hire-us{
      text-align: right;
      height: 4vw;
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
  }

  .links{
    padding: 40px 0px 30px;
  }

  .info{
    display: flex;
  }

  .address{
    flex: 0 0 auto;
    padding: 8px;
    padding-left: 0px;
    p{
      white-space: nowrap;
    }
  }
  .social{
    flex: 1 1 auto;
    text-align: right;
    margin-left: 40px;
    a{
      display: inline-block;
      padding: 10px;
    }
    svg{
      height: 20px;
      fill: $snow
    }
  }

  .video {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
  }

  //fonts
  .text{
    font-size: calc(15px + 1.5vw);
    line-height: 140%;
    font-weight: 200;
  }
  .hire-us{
    font-size: 20px;
    font-weight: 200;
  }
  .label{
    font-size: 20px;
    font-weight: 200;
  }
  .link{
    font-size: calc(10px + 3vw);
    line-height: 140%;
  }
  .address{
    font-size: 20px;
    line-height: 150%;
    font-weight: 200;
  }

  @media (max-width: 1100px){
    .social{
      margin-left: -10px;
      text-align: left;
      margin-top: 30px;
    }
    .info{
      flex-direction: column;
    }
  }

  @media (max-width: $mobile){
    min-height: inherit;
    .content{
      @include center
    }
    .menu{
      display: none;
    }
    .logo{
      display: none;
    }
  }

}
</style>
