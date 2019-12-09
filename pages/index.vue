<template lang="html">
  <div id="home" ref="home">
    <intro :data="data.intro" @loaded="setReady"/>
    <events :data="data.events"/>
    <comms :data="data.comms"/>
    <training :data="data.training"/>
  </div>
</template>

<script>
import data from '@/assets/data'
import intro from '@/components/home/intro'
import events from '@/components/home/events'
import comms from '@/components/home/comms'
import training from '@/components/home/training'
import {mapState} from 'vuex'
export default {
  components:{intro,events,comms, training},
  data(){
    return{
      data: data.home
    }
  },
  methods:{
    setReady(){
      this.$store.commit('set', {key: 'ready', val: true})
    }
  }
}
</script>

<style lang="scss">

</style>
