<template lang="html">
  <div class="">
    <div
      class="cover"
      :class="{ in: cover.show, out: !cover.show }"
      :style="{ animationDuration: cover.duration / 1000 + 's' }"
    />
  </div>
</template>

<script>
export default {
  computed: {
    cover() {
      return this.$store.state.animations.cover;
    }
  }
};
</script>

<style lang="css">
.cover {
  background: black;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 101;
}

.cover.in {
  animation-name: slide-in-bottom;
  animation-fill-mode: backwards;
}

.cover.out {
  animation-name: slide-out-top;
  animation-fill-mode: forwards;
  animation-delay: .1s
}
</style>
