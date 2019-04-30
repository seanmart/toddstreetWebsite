<template lang="html">
  <Grid>
    <Project v-for="(item, i) in data" :key="i" :data="item" class="project" />
    <slot></slot>
  </Grid>
</template>

<script>
import Project from "@/components/items/Project";
import Grid from "@/components/Grid";
export default {
  props: ["data"],
  components: { Project, Grid }
};
</script>

<style lang="css" scoped>
.project{
  flex: 0 0 50%;
  height: 400px;
}

@media screen and (max-width: 800px){
  .project{
    flex: 0 0 100%;
  }
}
</style>
