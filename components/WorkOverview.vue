<template lang="html">
  <div class="projects">
    <template v-for="(project, i) in projects">
      <div
        :key="i"
        class="project"
        :class="{ active: active === i }"
        v-touch="() => touchHandler(i)"
        v-touch-class="'hover'"
      >
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
  data() {
    return {
      active: null
    }
  },
  methods: {
    img(img) {
      return { backgroundImage: `url(${img})` }
    },
    touchHandler(key) {
      this.active = key == this.active ? null : key
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
  padding: 40px;
  position: relative;
  z-index: 0;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  opacity: 1;
}

.project .info{
  color: black;
  opacity: 0;
  transition: .5s;
  transform: translateX(-10px);
  position: relative;
  z-index: 1
}

.project span{
  user-select: none;
  display: block;
  margin-bottom: 10px;
  color: rgba(0,0,0,.3);
}

.project h3{
  user-select: none;
  display: block;
  margin-bottom: 40px;
}

@media screen and (min-width:800px){
  .hover .image{
    opacity: .05
  }

  .hover .info{
    opacity: 1;
    transform: translateX(0px);
  }
}

@media screen and (max-width:800px){

  .project{
    flex: 0 0 100%;
  }

  .active .image{
    opacity: .05
  }

  .active .info{
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
