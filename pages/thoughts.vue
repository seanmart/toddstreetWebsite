<template>
  <block extend space nav>
    <t title big thick before after center>
      <i class="blue">Thought</i> Leadership
    </t>
    <container gallery cards>
      <Post
        v-for="(thought, i) in thoughts"
        :key="i"
        :title="thought.title"
        :link="`/thought/${thought.id}`"
        :subtitle="thought.subtitle"
        :image="thought.image"
        linkColor="#aaa"
      />
    </container>
  </block>
</template>
<script>
import Post from '@/components/Post'
export default {
  components: { Post },
  data() {
    return {
      thoughts: this.$store.getters.thoughts
    }
  }
}
</script>
<style lang="css"></style>
