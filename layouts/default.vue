<template>
  <div id="site" >

    <loading @done="checkLoaded" :hide="hideLoading" @hidden="afterLoad" />

    <side-nav/>
    <nav-button/>

    <div id="scroll">
        <top-nav/>
        <nuxt />
        <bottom-nav/>
    </div>

  </div>
</template>

<script>

import {mapState} from 'vuex'
import loading from '@/sections/loading'
import sideNav from '@/sections/navigation/sideNav'
import topNav from '@/sections/navigation/topNav'
import bottomNav from '@/sections/navigation/bottomNav'
import navButton from '@/sections/navigation/navButton'
import imagesLoaded from 'imagesloaded'

export default{
  components:{topNav,sideNav,bottomNav,loading,navButton},
  data:()=>({
    loaded: false,
    hideLoading: false
  }),
  mounted(){
    this.beforeLoad()
    imagesLoaded('html',{background: true},this.checkLoaded)
  },
  watch:{
    ready(ready){
      if (ready) this.onReady()
    },
    $route(){
      ScrollBuddy.killAll()
      MouseBuddy.killAll()
      setTimeout(()=>this.$store.commit('ready', true),250)
    }
  },
  computed:mapState(['ready']),
  methods:{
    checkLoaded(){
      if (this.loaded) this.hideLoading = true
      this.loaded = true
    },
    beforeLoad(){
      gsap.timeline()
          .set('#site', {height: '100vh', overflow: 'hidden'})
          .set('header a',{yPercent: 110})
          .set('#nav-button',{scale: 0, opacity:0})
    },
    afterLoad(){
      gsap.timeline()
          .set('#site', {clearProps:"height, auto"})
          .add(()=> this.$store.commit('ready', true))
    },
    onReady(){
      scroller.refresh()

      gsap.timeline()
          .set('main',{clearProps:'all'})
          .fromTo('header a',.75,{yPercent: 110},{yPercent: 0,stagger:.1, ease: 'power4.out', clearProps: 'all'})
          .to('#nav-button',.5,{scale: 1, opacity:1, ease: 'power4.out'},.25)
    }
  },
  middleware(context){
    if (process.server) return

      return new Promise((next)=>{
        context.store.commit('ready', false)
        gsap.timeline({onComplete: next})
            .to('main',.5,{opacity:0},0)
            .to('header a',.75,{yPercent: -100, stagger:.1, ease: 'power4.in'},0)
            .to('#nav-button',.5,{scale: 0, opacity:0, ease:'power4.in'},.75)
        })
  },
}



</script>

<style lang="scss">

body{
  overscroll-behavior: none;
}

</style>
