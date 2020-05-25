<template lang="html">
  <page id="home">

    <intro :data="data.intro"/>
    <sizzle :data="data.sizzle"/>
    <events :data="data.events"/>
    <comms :data="data.comms"/>
    <training :data="data.training"/>

  </page>
</template>

<script>
import data from '@/assets/data/home'
import intro from '@/sections/home/intro'
import sizzle from '@/sections/home/sizzle'
import events from '@/sections/home/events'
import comms from '@/sections/home/comms'
import training from '@/sections/home/training'
export default {
  components:{intro, sizzle, events,comms, training},
  data(){
    return{
      data: data
    }
  }
}
</script>

<style lang="scss">

</style>
