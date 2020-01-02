<template>
  <block extend space nav>
    <t title big thick before after center>
      <i class="yellow">How</i> We Care
    </t>
    <container gallery cards>
      <Post
        v-for="(care, i) in cares"
        :key="i"
        :title="care.title"
        :image="care['cover-image']"
        :link="`/care/${care.id}`"
        :body="care.body"
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
      cares: this.$store.getters.cares
    }
  }
}
</script>
<style lang="css"></style>
