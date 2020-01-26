<template lang="html">
  <section id="events" v-scroll:section>
    <div class="intro">
      <div class="content" :class="{hide: hideIntro}" v-scroll="{onScroll: toggleIntro}">

        <div class="title">
            <h1 class="reveal-left" v-html="data.title" v-scroll="{parallax:{ySpeed:-1.2}}"/>
        </div>

        <div class="description">
          <p v-html="data.description"/>
        </div>

        <template v-for="(item,i) in stage">
          <div :key="i" :class="`stage ${item.class}`" :style="{transitionDelay:`${i * .1}s` }">
            <img :src="item.img" v-scroll="item.vScroll">
          </div>
        </template>

        <div class="info">
          <nuxt-link to="/info" v-scroll="{parallax:{ySpeed:1.8}}">
            <button >more info</button>
          </nuxt-link>
        </div>

      </div>
    </div>
    <div class="offerings" ref="offerings">

    </div>
    <div class="work">

    </div>
  </section>
</template>

<script>
import textMarquee from '@/components/textMarquee'
import textReveal from '@/components/textReveal'
export default {
  components:{textMarquee,textReveal},
  props:{
    data: {type: Object, default:()=>({})},
  },
  data(){
    return{
      hideIntro: true,
      stage:[
        {class: 'stage_4', vScroll: {parallax:{ySpeed:-.5,xSpeed: -.3}}, img: '/events/stage4.png' },
        {class: 'stage_1', vScroll: {parallax:{ySpeed:-1,xSpeed: .3}}, img: '/events/stage1.png' },
        {class: 'stage_3', vScroll: {parallax:{ySpeed:-1.2, xSpeed: -.3}}, img: '/events/stage3.png' },
        {class: 'stage_2', vScroll: {parallax:{ySpeed:-1.2,xSpeed: .3}}, img: '/events/stage2.png' },
      ]
    }
  },
  methods:{
    toggleIntro(e){
      this.hideIntro = e.percent < .2
    }
  }
}
</script>

<style lang="scss">
  #events{
    .intro{
      height: 100vh;
      padding: $unit * 2;
      .content{
        height: 100%;
        position:relative;
        .title{
          transition: transform .5s, opacity .5s;
          position: absolute;
          top: 0px;
          left: 0px;
          font-size: 6vw;
        }
        .description{
          transition: transform .5s, opacity .5s;
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 45%;
          font-size: 1.5vw;
          line-height: 160%;
        }
        .stage{
          transition: transform .5s, opacity .5s;
          position: absolute;
          opacity: .2;
          &.stage_1{
            top: 11.5vw;
            right: 16.6vw;
            width: 15vw;
          }
          &.stage_2{
            top: 26vw;
            right: 16.6vw;
            width: 15vw;
          }
          &.stage_3{
            top: 20vw;
            right: 2vw;
            width: 23vw;
          }
          &.stage_4{
            top: 0vw;
            right: 0vw;
            width: 23vw;
          }
          img{
            width: 100%;
          }
        }
        .info{
          transition: transform .5s, opacity .5s;
          position: absolute;
          right: 40vw;
          bottom: 0px;
          a{
            display: block;
            height: 120px;
            width: 120px;
            @include center;
          }
          button{
            flex: 0 0 auto;
            height: 100%;
            width: 100%;
            display: block;
            transition: height .25s, width .25s;
            border-radius: 100%;
            background: #c62828;
            color: $snow;
            font-size: 15px;
            font-weight: 500;
            @include center;
            &:hover{
              height: 120%;
              width: 120%;
            }
          }
        }
        &.hide{
          .title{
            transform: translateX(-10%);
            opacity: 0;
          }
          .description{
            transform: translateY(10%);
          }
          .stage{
            transform: scale(.7);
            opacity: 0;
          }
          .info{
            transform: scale(.7);
            opacity: 0;
          }
        }
      }
    }
    .offerings{
      height: 100vh;
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .marquee{
        flex: 0 0 auto;
      }
      .list{
        position: absolute;
        background: $snow;
        width: 50vw;
        height: 50vw;
        left:50%;
        transform: translateX(-50%);
      }
    }
    .work{
      min-height: 100vh;
    }
  }
</style>
