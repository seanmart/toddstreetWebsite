<template lang="html">
  <block nav space class="entry">
    <div class="limit">
      <box
        v-if="care['cover-image']"
        :image="care['cover-image']"
        class="care-image"
        ratio
      />
    </div>
    <container center>
      <div v-if="care" class="limit">
        <t title big thick before after>{{ care.title }}</t>
        <div v-html="care.html" />
      </div>
    </container>
  </block>
</template>

<script>
export default {
  data() {
    return {
      care: this.$store.getters.careById(this.$route.params.id)
    }
  }
}
</script>

<style lang="css" scoped>

.limit{
  max-width: 900px;
  margin: 0px auto;
}
</style>
