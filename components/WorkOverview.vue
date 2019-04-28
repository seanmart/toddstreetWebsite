<template lang="html">
  <div class="projects">
    <template v-for="(project, i) in projects">
      <div :key="i" class="project">
        <div class="info">
          <span>{{ project['work-category'] }}</span>
          <h3>{{ project.header }}</h3>
          <Link :to="`/work/${project.permalink}`">view project</Link>
        </div>
        <div class="image" :style="img(project['cover-image'])" />
      </div>
    </template>
  </div>
</template>

<script>
import { filter, orderBy } from 'lodash'
import Link from '@/components/Button'
export default {
  components: { Link },
  computed: {
    projects() {
      return this.$store.getters.workOverview
    }
  },
  methods: {
    img(img) {
      return { backgroundImage: `url(${img})` }
    }
  }
}
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
  height: 350px;
  position: relative;
  z-index: 0;
  overflow: hidden;
  background: #fff;
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
  transition: .25s;
  transform-origin: bottom center;
}

.project .info{
  padding: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  z-index: 1;
  text-align: center;
  color: black;
  opacity: 0;
  transition-delay: .1s;
  transition: .5s;
}

.project:hover .info{
  transition-delay: 0s;
  transition: .25s;
  opacity: 1
}

.project span{
  display: block;
  margin-bottom: 10px;
  color: rgba(0,0,0,.3);
}

.project h3{
  display: block;
  margin-bottom: 40px;
}


@media screen and (max-width:800px){
  .project{
    flex: 0 0 100%;
  }
}
</style>
