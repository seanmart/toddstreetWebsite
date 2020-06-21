<template lang="html">
  <main>
    <intro :data="data.intro"/>
    <sizzle :data="data.sizzle"/>
    <div class="capabilities" data-nav-container>
      <events :data="data.events" data-nav="events"/>
      <comms :data="data.comms" data-nav="communications"/>
      <training :data="data.training" data-nav="training"/>
    </div>
    <cares :data="data.cares"/>
    <about :data="data.about"/>
  </main>
</template>

<script>
import data from '@/assets/data/home'
import intro from '@/sections/home/intro'
import sizzle from '@/sections/home/sizzle'
import events from '@/sections/home/events'
import comms from '@/sections/home/comms'
import training from '@/sections/home/training'
import cares from '@/sections/home/cares'
import about from '@/sections/home/about'
export default {
  components:{intro,sizzle,events,comms,training,cares,about},
  data:()=>({data})
}
</script>

<style lang="scss">
  
</style>
