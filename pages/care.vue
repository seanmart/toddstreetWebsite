<template>
  <block extend space nav>
    <t title big thick before center> <i class="yellow">How</i> We Care </t>
    <container>
      <t body medium grey after>
        Every day, I’m awed and inspired by the individual and collective
        talents of our team. Their passion, commitment and value that they bring
        to our business, and in turn our clients, demands nothing but my deepest
        respect.
      </t>
      <t body medium grey after>
        From inception, I wanted toddstreet to be a company that delivered
        significant contributions in support of our clients businesses, while
        remaining cognizant of our teams’ personal interests, especially their
        philanthropic activities.
      </t>
      <t body medium grey after>
        Our unified commitment to apply our talents and capacities to benefit
        charitable organizations for social good broadens our experience,
        insight, creativity and awareness with the work we do for our clients.
        We believe we’re all better for it.
      </t>
      <t body medium thick>
        Todd Street
      </t>
    </container>
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
