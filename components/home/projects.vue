<template lang="html">
  <div class="projects-container">
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
  </div>
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
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.flickity.on("change", event => (this.index = event));
      
      this.$refs.flickity.on( 'dragStart.flickity', function( event, pointer ) {
    document.ontouchmove = function (e) {
        e.preventDefault();
    }
});
this.$refs.flickity.on( 'dragEnd.flickity', function( event, pointer ) {
    document.ontouchmove = function (e) {
        return true;
    }
});

});
  }
};
</script>

<style lang="css">
.slide{
  min-height: 90vh;
  width: 100vw;
}

.projects-container .flickity-page-dots {
  bottom: 30px;
}
</style>
