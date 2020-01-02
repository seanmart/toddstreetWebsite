<template lang="html">
  <div id="projects" class="inset">
    <div class="projects-container max">
      <div class="project-container" v-for="(project, i) in projects" :key="i">
        <div class="project-wrapper">
          <project
            :image="project.image"
            :text="project.text"
            :link="project.link"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import project from "@/components/global/project";
export default {
  components: { project },
  data() {
    return {
      nav: {
        label: "projects",
        path: "/projects",
        index: 2
      }
    };
  },
  computed: {
    projects() {
      let po = this.$store.getters.projects;
      return po.map(i => {
        return {
          image: i.cover,
          text: { title: i.header, category: i.category },
          link: "/projects/" + i.permalink
        };
      });
    }
  }
};
</script>

<style lang="css">
#projects{
  min-height: 200vh;
  background: black;
  color: white;
}

.projects-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.project-container{
  flex: 0 0 50%;
  padding: 10px;
}

.project-wrapper{
  padding-top: 100%;
  position: relative;
}

.project-wrapper .project{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
</style>
