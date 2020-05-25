<template lang="html">
  <div id="site">
    <nuxt/>
  </div>
</template>

<script>
import variables from '@/assets/scss/variables.scss'
import {mapState} from 'vuex'
export default {
  mounted(){
    window.addEventListener('resize',this.handleResize)
    this.handleResize()
  },
  computed: mapState(['mobile', 'tablet']),
  methods:{
    handleResize(){
      let width = window.innerWidth
      let {mobile, tablet} = variables

      mobile = parseInt(mobile)
      tablet = parseInt(tablet)

      if (width <= mobile && !this.mobile) this.$store.commit('set', {key: 'mobile', value: true})
      if (width > mobile && this.mobile) this.$store.commit('set', {key: 'mobile', value: false})
      if (width <= tablet && !this.tablet) this.$store.commit('set', {key: 'tablet',value: true})
      if (width > tablet && this.tablet) this.$store.commit('set', {key: 'tablet', value: false})
    }
  }
}
</script>

<style lang="scss">
  
</style>
