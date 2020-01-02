<template lang="html">
  <no-ssr>
    <flickity ref="flickity" :options="options">
      <slot />
    </flickity>
  </no-ssr>
</template>

<script>
export default {
  props: {
    options: Object,
    index: Number
  },
  data() {
    return {
      flickityIndex: 0
    };
  },
  watch: {
    index() {
      this.flickityIndex !== this.index &&
        this.$refs.flickity.select(this.index);
    },
    flickityIndex() {
      this.$emit("swipe", this.flickityIndex);
    }
  },
  mounted() {
    setTimeout(this.init, 500);
  },
  methods: {
    init() {
      this.$refs.flickity.on("change", event => (this.flickityIndex = event));

      this.$refs.flickity.on("dragStart.flickity", function(event, pointer) {
        document.ontouchmove = function(e) {
          e.preventDefault();
        };
      });
      this.$refs.flickity.on("dragEnd.flickity", function(event, pointer) {
        document.ontouchmove = function(e) {
          return true;
        };
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
