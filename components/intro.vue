<template lang="html">
  <div id="intro" class="inset" :class="{ show }">
    <div class="text" ref="text">
      <div class="line top" />
      <template v-for="(item, i) in titleArray">
        <h1 :key="i" ref="title" :style="tdelay(i)">{{ item }}</h1>
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
    video: String,
    delay: { type: Number, default: 0 }
  },
  data() {
    return {
      show: false
    };
  },
  mounted() {
    if (this.title) {
      let text = this.$refs.text;
      let textSize = 50;
      let width = 0;
      let percentWidthOfScreen = 70;

      this.$refs.title.forEach(title => {
        if (title.offsetWidth > width) width = title.offsetWidth;
      });
      text.style.fontSize = `${(textSize / width) * percentWidthOfScreen}vw`;
    }

    if (this.image || this.video) {
      window.addEventListener("scroll", this.handleScroll);
    }

    setTimeout(() => (this.show = true), this.delay);
  },
  destroyed() {
    if (this.image || this.video) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  },
  computed: {
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
    },
    tdelay(i) {
      return { transitionDelay: `.${i + 1}s` };
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
  font-size: 50px;
  padding: 20px;
}

#intro .text h1{
  line-height: 93%;
  font-size: inherit;
  font-weight: 900;
  transition: transform 1s;
  transform: translateX(-150%);
}

#intro.show .text h1{
  transform: translateX(0px);
}

#intro .bg{
  opacity: .6;
  background-size: cover;
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
}
</style>
