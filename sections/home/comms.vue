<template lang="html">
  <section id="comms" v-scroll:section>
    <div class="content">

    </div>
  </section>
</template>

<script>
import parallaxImage from "@/components/parallaxImage";
import reveal from "@/components/reveal";
export default {
  props: ["data"],
  components: { parallaxImage, reveal },
};
</script>

<style lang="scss">
#comms {
  .content {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .item {
    position: absolute;
  }

  .title-1 {
    right: 0px;
    top: 35vw;
  }

  .image-1 {
    top: 0px;
    width: 50vw;
    height: 50vw;
  }
}
</style>
