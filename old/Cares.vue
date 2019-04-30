<template lang="html">
  <Grid class="cares">
    <Post
      v-for="(item, i) in data"
      :key="i"
      :data="item"
      class="care"
      :link="`/care/${item.id}`"
    />
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

<style lang="css">
.cares{
  margin: -20px;
}

.care{
  flex: 0 0 33.333%;
  padding: 20px;
}

@media screen and (max-width: 1000px){
  .care{
    flex: 0 0 100%;
  }

  .care .inner-post{
    flex-direction: row;
  }
}

@media screen and (max-width: 700px){
  .care{
    flex-direction: column;
  }

  .care .inner-post{
    flex-direction: column;
  }
}
</style>
