<template lang="html">
  <no-ssr>
    <flickity ref="flickity" :options="flickityOptions">
      <project
        v-for="(project, i) in content"
        :key="i"
        :active="index === i"
        :image="project.image"
        :text="project.text"
        :link="project.link"
        class="slide carousel-cell"
      />
    </flickity>
  </no-ssr>
</template>

<script>
import project from "@/components/global/project";
export default {
  components: { project },
  props: {
    content: Array
  },
  data() {
    return {
      index: 0,
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true,
        freeScroll: false,
        autoPlay: 4000,
        pauseAutoPlayOnHover: false,
        selectedAttraction: 0.02,
        friction: 0.3
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.flickity.on("change", event => (this.index = event));
    });
  }
};
</script>

<style lang="css" scoped>
.slide{
  height: 600px;
  width: 100vw;
}
</style>
