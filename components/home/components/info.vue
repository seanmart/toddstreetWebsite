<template lang="html">
  <div class="info-section" :class="{reverse}" v-scroll="{onScroll}">
    <div class="circle" v-scroll="{y: -2}"/>
    <h2 v-html="subtitle" ref="subtitle"/>
    <h1  v-for="(line,i) in title.split('<br/>')" :key="i" v-html="line" ref="title"/>
    <div class="line main" ref="mainline"/>

    <div class="content">

      <p v-html="description" ref="description"/>

      <div class="offerings">

        <h3 ref="offerings">Offerings</h3>

        <div v-for="(offer, i) in offerings" :key="i" class="offer">

          <div class="line" ref="offerline"/>
          <h4 ref="offer">{{offer}}</h4>
          <div v-if="i == offerings.length - 1" class="line" ref="offerline"/>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import vars from '@/assets/scss/variables.scss'
import reveal from '@/components/animations/reveal'
export default {
  components:{reveal},
  props:{
    title: {type: String, default: null},
    subtitle: {type: String, default: null},
    description: {type: String, default: null},
    offerings:{type: Array, default: ()=>[]},
    reverse:{type: Boolean, default: false},
    cover: {type: String, default: null}
  },
  data(){
    return{
      resizeEvent: null,
      animation: null
    }
  },
  mounted(){
    window.innerWidth > parseInt(vars.mobile) && this.createAnimation()
  },
  methods:{
    createAnimation(){
      this.animation = this.$gsap.timeline({paused: true})
      this.animation.fromTo(this.$refs.subtitle,2,{yPercent: 100},{yPercent:0},.5)
      this.animation.fromTo(this.$refs.title,2,{yPercent: 100},{yPercent:0, stagger: .5},1)
      this.animation.fromTo(this.$refs.mainline,1.5,{width: 0},{width: '100%'},3)
      this.animation.fromTo(this.$refs.description,1,{opacity:0, yPercent: 20},{opacity:1, yPercent: 0},3.5)
      this.animation.fromTo(this.$refs.offerings,.75,{yPercent: 500},{yPercent:0},3.5)
      this.animation.fromTo(this.$refs.offer,.75,{xPercent: -100},{xPercent: 0,stagger:.2},4)
      this.animation.fromTo(this.$refs.offerline,.75,{width: 0},{width: '100%',stagger:.2,onComplete: this.killAnimation},4)
      this.animation.set({}, {}, 10)
    },
    killAnimation(){
      if (!this.animation) return
      this.animation.progress(1)
      this.animation = null
    },
    onScroll(e){
      this.animation && this.animation.progress(e.percent)
    }
  }
}
</script>

<style lang="scss">
.info-section{
  padding: 120px;
  padding-left: $site-padding;
  padding-right: $site-padding;
  position: relative;

  .circle{
    position: absolute;
    top: 0px;
    right: -50vw;
    height: 100vw;
    width: 100vw;
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: $creme;
    z-index: -1;
  }

  h1{
    font-size: 14vw;
    line-height: 75%;
  }

  h2{
    font-size: 6vw;
    margin-bottom: .5vw;
  }

  .line{
    border-top: 1px solid;
  }

  .main.line{
    margin: 7vw 0px;
    border-width: 2px;
    display: inline-block;
    width: 100%;
  }


  .content{
    text-align: left;
    display: flex;
    flex-direction: row;

    p{
      margin-top: -.5vw;
      font-size: 2.5vw;
      flex: 1 1 66.666%;
      padding-right: $site-padding;
    }

    .offerings{
      flex: 1 1 33.333%;

      h3{
        letter-spacing: 1px;
        margin-bottom: 1.7vw;
        font-size: 3.5vw;
      }

      .offer{
        overflow: hidden;

        h4{
          text-transform: uppercase;
          font-size: 1.75vw;
          letter-spacing: 1px;
          line-height: 100%;
          padding: 8px 0px;
        }

      }
    }
  }

  @media (max-width:$tablet){
    padding-left: $site-padding-tablet;
    padding-right: $site-padding-tablet;

    h1{
      font-size: 17vw;
    }

    h2{
      font-size: 8vw;
      margin-bottom: 2.1vw;
    }

    .main.line{
      margin: 10vw 0px;
    }

    .content{

      flex-direction: column;

      p{
        flex: 0 0 auto;
        padding: 0px;
        font-size: 3.25vw;
      }

      .offerings{
        margin-top: 10vw;
        flex: 0 0 auto;

        h3{
          font-size: 5vw;
          margin-bottom: 4vw;
        }

        .offer{

          h4{
            flex: 0 0 auto;
            font-size: 3vw;
            font-weight: 400;
            padding: 10px 0px;
          }
        }
      }
    }

  }
  @media (max-width: $mobile){
    padding-left: $site-padding-mobile;
    padding-right: $site-padding-mobile;

    h1{
      font-size: 17vw;
    }

    h2{
      font-size: 10vw;
      margin-bottom: 1.8vw;
    }

    .circle{
      display: none;
    }

    .content{

      p{
        font-size: 4.25vw;
      }

      .offerings{

        h3{
          font-size: 8vw;
          margin-bottom: 5vw;
        }

        .offer{

          h4{
            font-size: 5vw;
            padding: 12px 0px;
          }
        }
      }
    }
  }

}
</style>
