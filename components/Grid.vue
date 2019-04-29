<template lang="html">
  <div class="grid">
    <slot> </slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>

.grid{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
