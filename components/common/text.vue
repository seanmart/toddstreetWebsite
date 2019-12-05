<template lang="html">
  <div class="text" v-if="text">
    <div class="text-line" v-for="(item, i) in text" v-html="item" ref="line" />
  </div>
</template>

<script>
export default {
  props: {
    text: { type: Array, default: null },
    play: Boolean,
  }
};
</script>

<style lang="scss">
.text {
  display: inline-block;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.text.right {
  text-align: right;
}

.text-line {
  white-space: nowrap;
  display: block;
}
</style>
