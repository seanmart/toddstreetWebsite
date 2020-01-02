<template>
  <block space nav>
    <t title big thick before after center>
      <i class="red">What</i> We Deliver
    </t>
    <container gallery fullwidth>
      <Project
        v-for="(project, i) in projects.data"
        :active="projects.active === i"
        :key="i"
        :type="project['work-category']"
        :title="project.header"
        :link="`/projects/${project.permalink}`"
        :image="project['cover-image']"
        @clicked="projects.active = projects.active === i ? null : i"
      />
    </container>
  </block>
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
