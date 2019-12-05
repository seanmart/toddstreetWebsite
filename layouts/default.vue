<template>
  <div id="site" ref="site">
    <top />
    <nuxt />
    <bottom />
  </div>
</template>
<script>
import top from "@/components/site/top";
import bottom from "@/components/site/bottom";
import { mapState } from "vuex";
export default {
  components: { top, bottom },
  computed: mapState(["menu",'mode']),
  mounted(){
    this.$store.dispatch('initMode')

    this.$nextTick(()=>{
      this.$loco.init({
        el: this.$refs.site,
        smooth: true,
        getDirection: true,
      })
    })

    window.addEventListener('resize',()=>{
      this.$store.dispatch('updateMode')
    })
  },
};
</script>
<style lang="scss">
#site {
  color: $color;
}
</style>
