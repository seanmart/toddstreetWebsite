<template lang="html">
  <section id="intro" v-scroll:section>

    <div class="content">

      <div class="text">
        <text-reveal class="line" :play="ready" :delay=".5" @done="setScroll(true)">
          <div class="reveal-bottom" v-for="(line,i) in text" :key="i">
            <component :is="line" v-scroll="textScroll(i)"/>
          </div>
        </text-reveal>
      </div>

      <div class="cta">
        <text-reveal :play="ready" :delay="1">
          <a href="#" class="reveal-left">Hire Us</a>
        </text-reveal>
      </div>

      <div class="info">
          <text-reveal class="address" :play="ready" :delay="1.25">
            <p v-for="line in address" class="reveal-bottom">{{line}}</p>
          </text-reveal>

          <text-reveal class="social" :play="ready" :delay="1.5" horizontal>
            <a v-for="soc in social" :href="soc.link" class="reveal-bottom">
              <icons :icon="soc.icon"/>
            </a>
          </text-reveal>
      </div>

    </div>

    <video-player :videoId="data.video" class="video" v-scroll="{parallax:{ySpeed: -5}}"/>

  </section>
</template>

<script>
import navData from '@/assets/data/nav'
import videoPlayer from '@/components/videoPlayer'
import icons from '@/components/icons'
import textReveal from '@/components/textReveal'
import {mapState} from 'vuex'

import textSwap from '@/components/textSwap'
import Vue from 'vue'
Vue.component('textSwap', textSwap)

export default {
  components:{videoPlayer, icons, textReveal},
  props:{
    data: {type: Object, default: ()=> ({})}
  },
  data(){
    return{
      social: navData.social,
      address: navData.address
    }
  },
  mounted(){
    this.setScroll(false)
  },
  computed:{
    ...mapState(['ready']),
    text(){
      return this.data.text.split('<br/>').map(line => {
        let data = line.match(/\[(.*?)\]/)
        if (data){
          return {
            template: `<div>${line.replace(`[${data[1]}]`, `<text-swap :list="list" :speed="5"/>`)}</div>`,
            props:{list: {type: null, default:()=>this.data[data[1]]}}
          }
        } else {
          return{
            template:`<div>${line}</div>`
          }
        }
      })
    }
  },
  methods:{
    textScroll(i){
      return{
        parallax:[
          {min: 800,ySpeed: (this.text.length - i) / 2},
          {min: 0,ySpeed: (this.text.length - i) / 4}
        ]
      }
    },
    setScroll(x){
      this.$store.commit('setScroll', x)
    }
  }
}
</script>

<style lang="scss">
  #intro{
    @include padding();
    overflow: hidden;
    height: 100vh;

    .content{
      position: relative;
      height: 100%;
    }

    .text{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .line{
        flex: 0 0 auto;
        display: inline-block;
        font-size: $unit / 2;
        font-weight: 300;
        line-height: 150%;
      }

      .swap-item{
        font-style: italic;
        font-weight: bold;
        letter-spacing: .2vw;
        white-space: nowrap;
        margin: 0px .4vw;
      }
    }

    .info{
      position: absolute;
      bottom: 0px;
      right: 0px;
      display: flex;
      align-items: flex-end;

      .address{
        flex: 0 0 auto;
        line-height: 140%;
      }

      .social{
        flex: 0 0 auto;
        padding-left: 20px;
        a{
          line-height: 0;
          display: inline-block;
          padding: 0px 20px;
          fill: $snow;
          svg{
            width: 20px;
          }
        }
      }
    }

    .cta{
      position: absolute;
      bottom: 0px;
      left: 0px;
    }

    .video{
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: -1;
      width: 100vw;
      height: 100vh;
      opacity: .25;
    }

    @media (min-width: $fullscreen){
      .text .line{
        font-size: 40px;
      }
    }

    @media (max-width: $tablet){
      .text .line{
        font-size: 5vw;
      }
    }

    @media (max-width: $mobile){
      .text{
        font-size: 5.5vw;
      }
      .info{
        display: none;
      }
      .cta{
        display: none;
      }
    }

    @media (max-height: $mobileLandscape){
      .text .line{
        font-size: 6vh;
      }
    }


  }
</style>
