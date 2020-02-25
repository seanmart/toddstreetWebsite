<template lang="html">
  <section id="intro" v-scroll:section>

    <div class="text body-copy">
      <template>
      <reveal
        v-for="(line,i) in text"
        :key="i"
        :show="ready"
        :delay="i * .15"
        v-scroll="textScroll(i)"
        >
        <component :is="line"/>
      </reveal>
      </template>
    </div>

    <div class="bottom">
      <reveal left :show="ready" :delay=".25">
        <div>
          <nuxt-link to="/" class="button hire"><h4>Hire Us</h4></nuxt-link>
        </div>
      </reveal>
      <div class="info">
        <div class="address">
          <reveal v-for="(line,i) in siteData.address" :key="i" :show="ready" :delay=".5 + (i * .15)">
            <p v-html="line"/>
          </reveal>
        </div>
        <div class="social">
          <reveal v-for="(item,i) in siteData.social" :key="i" right :show="ready" :delay=" .75 + (i * .15)">
            <a :href="item.link"><icons :icon="item.icon" /></a>
          </reveal>
        </div>
      </div>
    </div>

    <div class="video" v-scroll="videoScroll">
      <media
        :youtube="data.youtube"
        :wistia="data.wistia"
        :image="data.image"
        v-scroll="videoScroll"
        @ready="ready = $event"
      />
    </div>
  </section>
</template>

<script>
import media from '@/components/video'
import reveal from '@/components/animations/reveal'
import Vue from 'vue'
import swap from '@/components/animations/swap'
import icons from '@/components/icons'
import siteData from '@/assets/data/site'
Vue.component('swap', swap)

export default {
  components:{media, reveal, icons},
  props:{data: Object, default:()=>({})},
  data(){
    return{
      ready: false,
      siteData
    }
  },
  computed:{
    text(){
      return this.data.text.split('<br/>').map(line => {
        let data = line.match(/\[(.*?)\]/)
        if (data){
          return {
            template: `<div>${line.replace(`[${data[1]}]`, `<swap :list="list" tag="h1" :speed="3.5"/>`)}</div>`,
            props:{list: {type: null, default:()=>this.data[data[1]]}}
          }
        } else {
          return{
            template:`<div>${line}</div>`
          }
        }
      })
    },
    videoScroll(){
      return{
        transform:{y: -3}
      }
    }
  },
  methods:{
    textScroll(i){
      return{
        transform:[
          {min: 800,y: (this.text.length - i) / 2},
          {min: 0,y: (this.text.length - i) / 4}
        ]
      }
    }
  }
}
</script>

<style lang="scss">
#intro{
  position: relative;
  overflow: hidden;
  background: $midnight;
  color: $snow;
  fill: $snow;

  .text{
    position: absolute;
    z-index: 1;
    top: 50%;
    left: $unit;
    transform: translateY(-50%);
    font-size: 2.5vw;

    .swap{
      font-family: titular, sans-serif;
      text-transform: uppercase;
      font-weight: 800;
      font-size: 4.5vw;
    }
  }

  .bottom{
    position: absolute;
    z-index: 1;
    bottom: $unit;
    left: $unit;
    right: $unit;
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    .hire{
      transform: translate(-20px, 20px);
      display: block;
    }

    .info{
      flex: 0 0 auto;
      margin-left: auto;
      white-space: nowrap;

      .address{
        display: inline-block;
        p{
          line-height: 100%;
          margin-top: 5px;
          font-size: 12px;
        }
      }
      .social{
        display: inline-flex;
        flex-direction: row;

        a{
          display: block;
          padding: 0px 20px;
          fill: $snow;
          svg{
            width: 30px;
          }
          &:last-child{
            padding-right: 0px;
          }
        }
      }
    }
  }

  .video{
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    opacity: .3
  }

  @media (max-width:$tablet){
    .text{
      left: $unit-tablet
    }
    .bottom{
      bottom: $unit-tablet;
      left: $unit-tablet;
      right: $unit-tablet;
    }
  }
  @media (max-width: $mobile){

  }
}
</style>
