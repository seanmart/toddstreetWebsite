<template lang="html">
  <page id="home" @init="init = true" :class="{init}">

    <intro :init="init" :data="data.intro"/>
    <sizzle :init="init" :data="data.sizzle"/>
    <events :init="init" :data="data.events"/>
    <comms :init="init" :data="data.comms"/>

  </page>
</template>

<script>
import data from '@/assets/data/home'
import intro from '@/sections/home/intro'
import sizzle from '@/sections/home/sizzle'
import events from '@/sections/home/events'
import comms from '@/sections/home/comms'
export default {
  components:{intro, sizzle, events,comms},
  data(){
    return{
      init: false,
      data: data
    }
  },
  mounted(){
    console.log('mounted page')
  }
}
</script>

<style lang="scss">

</style>
