<template lang="html">
  <main id="home">
    <landing :data="data.landing" :ready="ready"/>
    <sizzle :data="data.sizzle" />
    <capabilities :data="data.capabilities"/>
    <cares :data="data.cares"/>
    <about :data="data.about"/>
  </main>
</template>

<script>
import landing from '@/home/landing'
import sizzle from '@/home/sizzle'
import capabilities from '@/home/capabilities'
import cares from '@/home/cares'
import about from '@/home/about'
import data from '@/assets/data'
import {mapState} from 'vuex'
export default {
  components:{landing, sizzle,capabilities,cares, about},
  computed: mapState(['ready']),
  data:()=>({data: data.home})
}
</script>

<style lang="scss">
#home{

}
</style>
