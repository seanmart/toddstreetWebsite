<template lang="html">
  <div class="max cares-container">
    <post
      v-for="(post, i) in content"
      :key="i"
      :image="post.image"
      :text="post.text"
      :link="post.link"
      class="cares-post"
    />
  </div>
</template>

<script>
import post from "@/components/global/post";
export default {
  components: { post },
  props: { content: Array }
};
</script>

<style lang="css">
.cares-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
