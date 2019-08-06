<template lang="html">
  <div class="title inset">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="css">
.title h1{
  font-size: 50px;
  color: inherit;
  font-weight: 300;
}
</style>
