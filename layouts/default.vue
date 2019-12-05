<template>
  <div id="site" ref="site">
    <top />
    <nuxt />
    <bottom />
  </div>
</template>
<script>
import styles from '@/assets/scss/config.scss'
import top from "@/components/site/top";
import bottom from "@/components/site/bottom";
import { mapState } from "vuex";
export default {
  components: { top, bottom },
  computed: mapState(["menu",'disableParallax']),
  data(){
    return{
      disableParallaxWidth: null
    }
  },
  mounted(){

    this.disableParallaxWidth = parseInt(styles.disableParallax)
    this.getWidth()

    window.addEventListener('resize', this.getWidth)

    setTimeout(()=> this.$loco.update(),250)

  },
  methods:{
    getWidth(){
      let isLess = window.innerWidth < this.disableParallaxWidth
      this.$store.commit('set', {key:'disableParallax',val:isLess})
    }
  }
};
</script>
<style lang="scss">
#site {
  color: $color;
}
</style>
