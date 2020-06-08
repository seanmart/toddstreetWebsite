<template lang="html">
  <main id="home">

    <intro :data="data.intro" :ready="ready"/>
    <sizzle :data="data.sizzle"/>
    <side-nav/>
    <div class="capabilities">
      <events :data="data.events" data-nav="Events"/>
      <comms :data="data.comms" data-nav="Communications"/>
      <training :data="data.training" data-nav="Training"/>
    </div>
    <cares :data="data.cares" class="offset-section"/>
    <about :data="data.about"/>

  </main>
</template>

<script>
import intro from '@/sections/home/intro'
import sizzle from '@/sections/home/sizzle'
import events from '@/sections/home/events'
import comms from '@/sections/home/comms'
import training from '@/sections/home/training'
import cares from '@/sections/home/cares'
import about from '@/sections/home/about'
import sideNav from '@/components/sideNav'

import {mapState} from 'vuex'
import data from '@/assets/data/home'

export default {
  head(){title: 'home – toddstreet'},
  components:{intro, sizzle, events, comms, training, cares, about, sideNav},
  computed:mapState(['ready']),
  data:()=>({
    data: data,
    navAnimation: null
  }),
  mounted(){
    let tl = gsap.timeline({paused: true})
    tl.to('#side-nav', .75,{xPercent: -100, ease: 'expo.out'},0)
    tl.to('#side-nav', .75,{xPercent: 0, ease: 'expo.in'},10)
    this.navAnimation = tl
  }
}
</script>

<style lang="scss">

#home{
  .capabilities{
    position: relative;
    z-index: 1;
  }
  .offset-section{
    margin-top: -200px;
    padding-top: 200 + $desktop-margins;
    z-index: 0;
  }
}


</style>
