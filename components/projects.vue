<template lang="html">
  <no-ssr>
    <carousel :perPage="1" @page-change="activeProject = $event">
      <slide v-for="(project, i) in projects" :key="i">
        <project
          :trigger="activeProject === i"
          :image="project.image"
          :text="project.text"
          class="slide"
        />
      </slide>
    </carousel>
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
      activeProject: 0
    };
  }
};
</script>

<style lang="css" scoped>
.slide{
  height: 80vh;
  width: 100vw;
}
</style>
