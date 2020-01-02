<template lang="html">
  <block nav space extend class="entry">
    <container gallery>
      <box col3>
        <box
          v-if="care['cover-image']"
          :image="care['cover-image']"
          class="care-image"
          ratio
        />
      </box>
      <box col2 grow class="content">
        <t title big thick after>{{ care.title }}</t>
        <div v-html="care.html" />
      </box>
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
.content{
  padding: 0px 20px;
}
</style>
