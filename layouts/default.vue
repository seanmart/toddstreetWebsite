<template>
  <div id="site">
    <top />
    <loading/>
    <div id="scroll">
      <nuxt />
      <bottom />
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
  computed: mapState(["menu",'disableParallax','ready']),
  data(){
    return{
      disableParallaxWidth: parseInt(styles.disableParallax)
    }
  },
  mounted(){
    this.$loco.stop()
    window.addEventListener('resize', this.getWidth)
    this.getWidth()

  },
  watch:{
    ready(){
      this.$loco.start()
      this.$loco.update()
    }
  },
  methods:{
    getWidth(){
      let isLess = window.innerWidth < this.disableParallaxWidth
      isLess !== this.disableParallax && this.$store.commit('set', {key:'disableParallax',val:isLess})
    }
  }
};
</script>
