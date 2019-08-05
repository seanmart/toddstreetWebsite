<template lang="html">
  <div id="intro" class="inset">
    <div class="text">
      <h1 v-for="(item, i) in title" :key="i" ref="text">{{ item }}</h1>
    </div>
    <div class="bg" ref="bg">
      <div v-if="video" class="video"></div>
      <div v-if="image" class="image" :style="bgImage(image)" />
    </div>
  </div>
</template>

<script>
import { TweenMax } from "gsap";
export default {
  props: {
    title: Array,
    image: String,
    video: String
  },
  mounted() {
    TweenMax.set(this.$refs.text, { xPercent: -100, opacity: 0 });
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    ready() {
      return this.$store.state.ready;
    }
  },
  watch: {
    ready() {
      TweenMax.set(this.$refs.text, { opacity: 1 });
      TweenMax.staggerTo(this.$refs.text, 0.75, { xPercent: 0 }, 0.2);
    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY > window.innerHeight) return;
      this.$refs.bg.style.transform = `translateY(${window.scrollY / 1.4}px)`;
    },
    bgImage(image) {
      return { backgroundImage: `url(${image})` };
    }
  }
};
</script>

<style lang="css">
#intro{
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#intro .text{
  color: white;
  display: inline-block;
  overflow: hidden;
}

#intro .text h1{
  line-height: 93%;
  font-size: 9vw;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.mobile #intro .text h1{
  line-height: 110%;
  letter-spacing: -1px
}

#intro .bg{
  opacity: .4;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

#intro .bg .image{
  height: 100%;
  width: 100%;
  background-size: cover;
}
</style>
