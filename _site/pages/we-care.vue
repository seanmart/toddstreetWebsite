<template>
  <section class="bg-lg">
    <intro>We Care</intro>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('nav/navColor')
  }
}
</script>

<style>
</style>
