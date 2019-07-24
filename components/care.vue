<template lang="html">
  <div id="care" class="inset" v-scroll="{ name }">
    <div class="max">
      <h1>We Care</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "white"
    };
  }
};
</script>

<style lang="css">
#care{
  height: 100vh;
}
</style>
