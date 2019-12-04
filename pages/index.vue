<template lang="html">
  <div id="home" ref="home">
    <intro :data="data.intro"/>
    <events :data="data.events"/>
  </div>
</template>

<script>
import data from '@/assets/data'
import intro from '@/components/home/intro'
import events from '@/components/home/events'
import {mapState} from 'vuex'
export default {
  components:{intro,events},
  data(){
    return{
      data: data.home
    }
  }
}
</script>

<style lang="css">

</style>
