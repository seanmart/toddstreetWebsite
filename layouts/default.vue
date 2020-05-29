<template>
  <div id="page" v-page :class="{touch}">
    <site-header @ready="ready"/>
    <nuxt />
    <site-footer/>
  </div>
</template>
<script>
import siteHeader from '@/components/siteHeader'
import siteFooter from '@/components/siteFooter'
import {mapState} from 'vuex'
export default{
  components:{siteHeader,siteFooter},
  mounted(){
    this.$store.commit('touch', this.$vb.touch)
  },
  watch:{
    $route(){
      this.$store.commit('ready', false)
    }
  },
  methods:{
    ready(){
      this.$store.commit('ready', true)
      setTimeout(() => this.$vb.init(),250)
    }
  },
  computed: mapState(['touch'])
}
</script>
<style lang="scss">

#page{
  overflow: hidden;
  width: 100vw;
  &.hide{
    opacity: 0;
  }
}

.page-enter-active, .page-leave-active {
  transition: 1s
}
.page-enter, .page-leave-active{
  opacity: 0;
}
</style>
