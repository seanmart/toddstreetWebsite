<template lang="html">
  <div id="intro" class="inset" :class="{ show: intro.show }">
    <div class="text">
      <div class="line top" />
      <template v-for="(item, i) in titleArray">
        <h1
          :key="i"
          :style="{
            transitionDelay: i / 10 + 's',
            transitionDuration: intro.duration / 1000 + 's'
          }"
        >
          {{ item }}
        </h1>
      </template>
      <div class="line bottom" />
    </div>
    <div class="bg" ref="bg">
      <div v-if="video" class="video"></div>
      <div v-if="image" class="image" :style="bgi(image)" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: [Array, String],
    image: String,
    video: String
  },
  mounted() {
    if (this.image || this.video) {
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  destroyed() {
    if (this.image || this.video) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  computed: {
    intro() {
      return this.$store.state.animations.intro;
    },
    titleArray() {
      if (!this.title) return [];
      if (Array.isArray(this.title)) return this.title;
      return [this.title];
    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY > window.innerHeight) return;
      this.$refs.bg.style.top = `${window.scrollY / 2}px`;
    },
    bgi(i) {
      return {
        backgroundImage: `url(${i})`
      };
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
  padding: 20px;
}

#intro .text h1{
  line-height: 93%;
  font-size: 100px;
  font-weight: 900;
  transition: transform .75s;
  transform: translateX(-150%);
}

#intro.show .text h1{
  transform: translateX(0px);
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
