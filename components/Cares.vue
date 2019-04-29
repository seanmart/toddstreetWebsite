<template lang="html">
  <Grid class="cares">
    <Post v-for="(item, i) in data" :key="i" :data="item" class="care" />
  </Grid>
</template>

<script>
import Post from "@/components/items/Post";
import Grid from "@/components/Grid";
export default {
  props: ["data"],
  components: { Post, Grid }
};
</script>

<style lang="css" scoped>
.cares{
  margin: -20px;
}

.care{
  flex: 0 0 33.333%;
  padding: 20px;
}

@media screen and (max-width: 1000px){
  .care{
    flex-direction: row;
    flex: 0 0 100%;
  }
}

@media screen and (max-width: 700px){
  .care{
    flex-direction: column;
  }
}
</style>
