<template lang="html">
  <section class="avoid-nav is-max-width">
    <h1 class="is-padding-bottom title">
      <i class="text-red">What</i> We Deliver
    </h1>
    <div id="content">
      <Projects :data="projects" />
    </div>
  </section>
</template>

<script>
import Projects from "@/components/Projects";
export default {
  components: { Projects },
  data() {
    return {
      projects: this.$store.getters.projects
    };
  }
};
</script>

<style lang="css" scoped>


.project{
  flex: 0 0 33.333%;
  height: 350px;
}

@media screen and (max-width: 1100px){
  .project{
    flex: 0 0 50%;
  }
}

@media screen and (max-width: 800px){
  .project{
    flex: 0 0 100%;
  }
}
</style>
