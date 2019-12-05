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
  computed: mapState(["menu",'size']),
  mounted(){

    this.$loco.init({
      el: this.$refs.site,
      smooth: true,
      smoothMobile: true,
      getDirection: true,
      touchMultiplier: 4
    })

  }
};
</script>
<style lang="scss">
#site {
  color: $color;
}
</style>
