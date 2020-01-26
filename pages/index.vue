<template lang="html">
  <div id="home">
    <intro :data="data.intro"/>
    <events :data="data.events"/>
  </div>
</template>

<script>
import intro from '@/sections/home/intro'
import events from '@/sections/home/events'
import data from '@/assets/data/home'
export default {
  data(){
    return{data}
  },
  components:{intro,events}
}
</script>

<style lang="scss">
  #home .big-title{
    font-size: 100px;
    line-height: 120%;
  }
</style>
