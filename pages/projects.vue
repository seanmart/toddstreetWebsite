<template lang="html">
  <div class="container"></div>
</template>

<script>
export default {
  data() {
    return {
      nav: {
        label: "projects",
        path: "/projects",
        nav: 2
      }
    };
  }
};
</script>

<style lang="css" scoped>
.container{
  min-height: 200vh;
  background: black;
  color: white;
}
</style>
