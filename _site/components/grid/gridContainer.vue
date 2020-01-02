<template lang="html">
  <div class="grid">
    <div class="inner-grid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css">

.inner-grid{
  margin-left: -10px;
  margin-right: -10px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
}
</style>
