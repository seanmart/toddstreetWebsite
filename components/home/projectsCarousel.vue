<template lang="html">
  <carousel
    :options="options"
    @swipe="index = $event"
    class="projects-carousel"
  >
    <project
      v-for="(project, i) in content"
      :key="i"
      :active="index === i"
      :image="project.image"
      :text="project.text"
      :link="project.link"
      class="project-slide"
    />
  </carousel>
</template>

<script>
import project from "@/components/global/project";
import carousel from "@/components/global/carousel";
export default {
  components: { project, carousel },
  props: {
    content: Array
  },
  data() {
    return {
      index: 0,
      options: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: true,
        wrapAround: true,
        freeScroll: false,
        autoPlay: false,
        pauseAutoPlayOnHover: false,
        selectedAttraction: 0.02,
        friction: 0.25
      }
    };
  }
};
</script>

<style lang="css">
.project-slide{
  min-height: 90vh;
  width: 100vw;
}

.projects-carousel .flickity-page-dots {
  bottom: 30px;
}
</style>
