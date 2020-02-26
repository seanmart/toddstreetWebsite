<template lang="html">
  <div class="info-section" v-scroll="{onScroll,onLeaveTop}" :class="{reverse}">
    <div class="circle" v-scroll="circleScroll" :style="circleStyles"/>
    <h2 v-html="subtitle" ref="subtitle"/>
    <h1  v-for="(line,i) in titleLines" :key="i" v-html="line" ref="title"/>
    <div class="line main" ref="mainline"/>

    <div class="content">

      <p class="description" v-html="description" ref="description"/>

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
      animation: null,
      cancelAnimation: false
    }
  },
  mounted(){
    this.animation = this.$gsap.timeline({paused: true})
    this.animation.fromTo(this.$refs.subtitle,2,{yPercent: 100},{yPercent:0},.5)
    this.animation.fromTo(this.$refs.title,2,{yPercent: 100},{yPercent:0, stagger: .5},1)
    this.animation.fromTo(this.$refs.mainline,1.5,{width: 0},{width: '100%'},3)
    this.animation.fromTo(this.$refs.description,2,{opacity:0, yPercent: 20},{opacity:1, yPercent: 0},3.5)
    this.animation.fromTo(this.$refs.offerings,.75,{yPercent: 500},{yPercent:0},3.5)
    this.animation.fromTo(this.$refs.offer,.75,{xPercent: -100},{xPercent: 0,stagger:.2},4)
    this.animation.fromTo(this.$refs.offerline,.75,{width: 0},{width: '100%',stagger:.2,onComplete: ()=> this.cancelAnimation = true},4)
    this.animation.set({}, {}, 10)
  },
  computed:{
    circleStyles(){
      if (!this.cover) return {}
      return {backgroundImage: `url(${this.cover})`}
    },
    titleLines(){
      return this.title.split('<br/>')
    },
    circleScroll(){
      return{
        transform:{y:-2}
      }
    }
  },
  methods:{
    onLeaveTop(){
      this.cancelAnimation = false
    },
    onScroll(e){
      if (this.cancelAnimation) return
      this.animation.progress(e.percent)
    },
  }
}
</script>

<style lang="scss">
.info-section{
  padding: $unit;
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

  .line{
    border-top: 1px solid;
  }

  h2{
    font-size: 6vw;
    margin-bottom: $unit / 4
  }

  h1{
    font-size: 14vw;
    line-height: 75%;
  }

  .main.line{
    margin: $unit 0px;
    border-width: 2px;
    display: inline-block;
  }


  .content{
    text-align: left;
    display: flex;
    flex-direction: row;

    .description{
      font-size: 2.5vw;
      flex: 1 1 66.666%;
      padding-right: $unit;
    }

    .offerings{
      flex: 1 1 33.333%;

      h3{
        letter-spacing: 1px;
        margin-bottom: $unit / 4;
        font-size: 3vw;
      }

      .offer{
        overflow: hidden;

        h4{
          text-transform: uppercase;
          font-size: 1.5vw;
          letter-spacing: 1px;
          line-height: 100%;
          padding: 8px 0px;
        }

      }
    }
  }

  &.reverse{
    text-align: right;
    .circle{
      left: -50vw;
    }
    .content{
      flex-direction: row-reverse;
      .description{
        padding-right: 0;
        padding-left: $unit;
      }
    }
  }

  @media (max-width:$tablet){
    padding: $unit-tablet;

    h1{
      font-size: 17vw;
      line-height: 75%;
    }
    
    &.reverse .content,
    .content{
      flex-direction: column;

      .description{
        flex: 0 0 auto;
        padding: 0px 0px $unit-tablet;
        font-size: 3.5vw;
      }

      .offerings{
        flex: 0 0 auto;

        h3{
          font-size: 5vw;
        }

        .offer{

          h4{
            flex: 0 0 50%;
            font-size: 2.5vw;
          }
        }
      }
    }

  }
  @media (max-width: $mobile){
    padding: $unit-mobile;
  }

}
</style>
