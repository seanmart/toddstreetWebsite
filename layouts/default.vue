<template>
  <div class="">

    <loading :hide="ready"/>

    <div id="site" :class="{hide: !ready}">
      <top/>
      <div id="scroll">
        <nuxt/>
        <bottom/>
      </div>
    </div>

  </div>
  </div>
</template>
<script>
import styles from '@/assets/scss/config.scss'
import loading from '@/components/site/loading'
import top from "@/components/site/top";
import bottom from "@/components/site/bottom";
import { mapState } from "vuex";
export default {
  components: { top, bottom,loading },
  data(){
    return{
      parallaxWidth: parseInt(styles.disableParallax),
    }
  },
  computed: mapState(['ready']),
  mounted(){

    window.addEventListener('resize', this.getWidth)
    this.getWidth()
    this.$loco.stop()

  },
  watch:{
    ready(){
      this.$loco.start()
      this.$loco.update()
    }
  },
  methods:{
    getWidth(){
      this.$store.commit('set', {
        key:'parallax',
        val: window.innerWidth >= this.parallaxWidth
      })
    }
  }
};
</script>
<style>
  #site.hide{
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    opacity: 0;
  }
</style>
