<template lang="html">
  <header ref="header" v-scroll="headerProps">
    <div class="content">

      <div class="logo" ref="logo">
        <icons icon="logo"/>
      </div>

      <nav>
        <nuxt-link v-for="(link,i) in links" to="/" :key="i" class="nav-item">
          <span ref="link">{{'link ' + link}}</span>
        </nuxt-link>
      </nav>

    </div>
  </header>
</template>

<script>
import icons from '@/components/icons'
import {mapState} from 'vuex'
export default {
  components:{icons},
  data(){
    return{
      links: 3,
      animations:{}
    }
  },
  mounted(){
    this.init()
    this.setAnimations()
  },
  watch:{
    ready(){
      this.onReady()
    }
  },
  methods:{
    init(){
      this.$gsap.set(this.$refs.logo,{yPercent: 100, opacity: 0})
      this.$gsap.set(this.$refs.link,{yPercent: 100})
    },
    setAnimations(){
      this.animations.header = this.$gsap.to(this.$refs.header,1,{yPercent: -100}).pause()
    },
    onReady(){
      let tl = this.$gsap.timeline()
      tl.to(this.$refs.logo,.5,{yPercent: 0, opacity: 1},0)
      tl.to(this.$refs.link,.5,{yPercent: 0, stagger: .1},.1)
    }
  },
  computed:{
    ...mapState(['ready']),
    headerProps(){
      return{
        transform: false,
        onScroll:(e)=> this.animations.header.progress(e.percent)
      }
    }
  }
}
</script>

<style lang="scss">
header{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  padding: $site-padding / 2 $site-padding;

  .content{
    position: relative;
    height: 100%;
    width: 100%;
  }

  .logo{
    position: absolute;
    top: 0px;
    left: 0px;

    svg{
      width: 175px;
    }
  }
  nav{
    position: absolute;
    top: 0px;
    right: 0px;

    .nav-item{
      overflow: hidden;
      margin-left: 5vw;
      display: inline-block;

      span{
        display: inline-block;
        @include font('link')
      }
    }
  }

  &.scrolling{
    transform: translateY(-100%);
  }
}
</style>
