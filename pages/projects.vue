<template>
  <container topnav>
    <t title big thick center>How We Serve</t>
    <container flex row id="WORK">
      <Project
        v-for="(project, i) in projects.data"
        :key="i"
        :active="projects.active === i"
        :title="project.header"
        :image="project['cover-image']"
        :link="project.permalink"
        :type="project['work-category']"
        @clicked="projects.active = projects.active === i ? null : i"
      />
    </container>
  </container>
</template>
<script>
import Project from '@/components/Project'
export default {
  components: { Project },
  data() {
    return {
      projects: {
        data: this.$store.getters.projects,
        active: null
      }
    }
  }
}
</script>
<style lang="css"></style>
