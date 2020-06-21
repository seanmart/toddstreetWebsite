<template>
  <div id="site" >

    <loading/>
    <side-nav/>
    <nav-button/>

    <div id="scroll">
        <top-nav data-section/>
        <nuxt />
        <bottom-nav data-section/>
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
  mounted(){
    this.beforeLoad()

    let time = Date.now()
    imagesLoaded('html',{background: true},()=> {
      let diff = Math.max(1500 - (Date.now() - time),0)
      setTimeout(this.afterLoad,diff)
    })
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
    beforeLoad(){
      gsap.timeline()
          .set('#site', {height: '100vh', overflow: 'hidden'})
          .set('header a',{yPercent: 110})
          .set('#nav-button',{scale: 0, opacity:0})
          .to('#loading svg',.5,{delay: .25, y:0, opacity:1})
    },
    afterLoad(){
      gsap.timeline()
          .to('#loading',.5,{height:0,display:'none', ease: 'power2.in'},0)
          .add(()=> this.$store.commit('ready', true),.75)
    },
    onReady(){
      scroller.refresh()
      gsap.timeline()
          .fromTo('header a',.75,{yPercent: 110},{yPercent: 0,stagger:.1, ease: 'power4.out', clearProps: 'all'},0)
          .fromTo('#nav-button',.5,{scale: 0, opacity:0},{scale: 1, opacity:1, ease: 'power4.out'},.25)
    }
  },
  middleware(context){
    if (!process.server){
      return new Promise((next)=>{
        gsap.timeline()
            .add(context.store.commit('ready', false))
            .to('main',{y: 50, opacity:0},0)
            .to('header a',.75,{yPercent: -100, stagger:.1, ease: 'power4.in'},0)
            .to('#nav-button',.5,{scale: 0, opacity:0, ease:'power4.in'},.75)
            .add(next)
      })
    }
  },
}



</script>

<style lang="scss">

body{
  overscroll-behavior: none;
}

</style>
