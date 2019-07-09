<template lang="html">
  <no-ssr>
    <flickity ref="flickity" :options="flickityOptions">
      <project
        v-for="(project, i) in projects"
        :key="i"
        :trigger="index === i"
        :image="project.image"
        :text="project.text"
        class="slide carousel-cell"
      />
    </flickity>
  </no-ssr>
</template>

<script>
import project from "@/components/project";
export default {
  components: { project },
  props: {
    projects: Array
  },
  data() {
    return {
      index: 0,
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: true,
        wrapAround: true,
        freeScroll: false,
        autoPlay: 5000
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
  height: 80vh;
  width: 100vw;
}
</style>
