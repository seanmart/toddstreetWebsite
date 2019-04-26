<template lang="html">
  <div class="projects">
    <template v-for="(project, i) in projects">
      <div :key="i" class="project" :style="{ background: project.color }">
        <div class="info">
          <span>{{ project["work-category"] }}</span>
          <h3>{{ project.header }}</h3>
          <nuxt-link :to="`/work/${project.permalink}`">View</nuxt-link>
        </div>
        <div class="image" :style="img(project['cover-image'])" />
      </div>
    </template>
  </div>
</template>

<script>
import { filter, orderBy } from "lodash";
export default {
  computed: {
    projects() {
      return this.$store.getters.workOverview;
    }
  },
  methods: {
    img(img) {
      return { backgroundImage: `url(${img})` };
    }
  }
};
</script>

<style lang="css" scoped>

.projects{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: #f2583e
}

.project{
  flex: 0 0 50%;
  padding: 0px 80px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.project .image{
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 0;
  transition: .25s
}

.project .info{
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  opacity: 0
}

.project:hover .image{
  transform: scale(1.10);
  opacity: .2;
}

.project:hover .info{
  opacity: 1
}

.project span{
  display: block;
  margin-bottom: 10px;
}

.project h3{
  display: block;
  margin-bottom: 40px;
}

.project a{
  padding: 5px 15px;
  border: 1px solid white;
  border-radius: 3px;
}

@media screen and (max-width:800px){
  .project{
    flex: 0 0 100%;
  }
}
</style>
