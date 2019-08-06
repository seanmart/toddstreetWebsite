<template lang="html">
  <div class="background">
    <div ref="bg" class="image" :style="bgImage(image)" />
  </div>
</template>

<script>
export default {
  props: {
    image: String
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    bgImage(image) {
      return { backgroundImage: `url(${image})` };
    },
    handleScroll() {
      if (window.scrollY > window.innerHeight) return;
      window.requestAnimationFrame(() => {
        this.$refs.bg.style.transform = `translate3D(0px, ${(
          window.scrollY / 2
        ).toFixed(2)}px,0)`;
      });
    }
  }
};
</script>

<style lang="css">
.background{
  position: relative;
  overflow: hidden
}

.background .image{
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-size: cover;
  background-position: center center;
}
</style>
