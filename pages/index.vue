<template lang="html">
  <div id="home">
    <intro :data="data.intro"/>
    <events :data="data.events"/>
    <comms :data="data.comms"/>
    <training :data="data.training"/>
  </div>
</template>

<script>
import data from '@/assets/data/home'
import intro from '@/components/home/intro'
import events from '@/components/home/events'
import comms from '@/components/home/comms'
import training from '@/components/home/training'
export default {
  components:{intro,events,comms,training},
  data(){
    return{
      data
    }
  }
}
</script>

<style lang="scss">
</style>
