<template lang="html">
  <div id="home">
    <intro :data="data.intro"/>
    <events :data="data.events"/>
    <comms/>
    <training/>
  </div>
</template>

<script>
import intro from '@/sections/intro'
import events from '@/sections/events'
import comms from '@/sections/comms'
import training from '@/sections/training'
import data from '@/assets/data/home'
export default {
  components:{intro, events, comms, training},
  data(){
    return{
      data: data
    }
  }
}
</script>

<style lang="scss">
</style>
