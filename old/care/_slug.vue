<template lang="html">
  <div class="avoid-nav care-post">
    <div id="content" class=" is-max-width">
      <div v-if="post">
        <div
          class="care-image"
          :style="{ backgroundImage: `url(${post['cover-image']})` }"
        />
        <div class="care-content is-padding is-white">
          <h2 class="is-padding-bottom">{{ post.title }}</h2>
          <div v-html="post.html" />
        </div>
      </div>
    </div>
    <div class="is-padding">
      <div class="is-max-width">
        <Grid class="other-posts">
          <template v-for="(post, i) in otherPosts">
            <Post
              class="post"
              :key="i"
              :link="`/care/${post.id}`"
              :data="post"
            />
          </template>
        </Grid>
      </div>
    </div>
  </div>
</template>

<script>
import { keyBy } from "lodash";
import Post from "@/components/items/Post";
import Grid from "@/components/Grid";
export default {
  components: { Post, Grid },
  computed: {
    cares() {
      return this.$store.getters.cares;
    },
    slug() {
      return this.$route.params.slug;
    },
    post() {
      return this.cares[this.index];
    },
    index() {
      let index = 0;
      this.cares.forEach((post, i) => {
        if (post.id === this.slug) index = i;
      });
      return index;
    },
    otherPosts() {
      let previous =
        this.index === 0
          ? this.cares[this.cares.length - 1]
          : this.cares[this.index - 1];

      let next =
        this.index === this.cares.length - 1
          ? this.cares[0]
          : this.cares[this.index + 1];

      return [previous, next];
    }
  }
};
</script>

<style lang="css">
.care-post{
  min-height: 100vh
}

.care-content p{
  margin-bottom: 20px;
  font-size: calc(.8em + .5vw);
  color: #777;
}

.care-content h2{
  font-weight: 900;
}

.care-content a{
  text-decoration: underline;
}

.care-image{
  height: 500px;
  background-size: cover;
  background-position: center center;
}

.other-posts{
  margin: -20px;
}

.other-posts h3{
  margin-bottom: 20px;
}

.other-posts .post{
  flex: 0 0 50%;
  padding: 20px;
}
</style>
