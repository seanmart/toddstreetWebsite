<template lang="html">
  <div id="intro" class="inset">
    <div class="text">
      <h1 v-for="(item, i) in title" :key="i" ref="text">{{ item }}</h1>
      <div class="line" ref="line" />
      <div class="description" ref="desc">
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters
        </p>
      </div>
    </div>
    <div class="bg" ref="bg">
      <div v-if="video" class="video"></div>
      <div v-if="image" class="image" :style="bgImage(image)" />
    </div>
  </div>
</template>

<script>
import { TweenMax, TimelineMax } from "gsap";
export default {
  props: {
    title: Array,
    image: String,
    video: String
  },
  mounted() {
    TweenMax.set(this.$refs.text, { xPercent: -150, opacity: 0 });
    TweenMax.set(this.$refs.line, { width: 0 });
    TweenMax.set(this.$refs.desc, { yPercent: 25, opacity: 0 });
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
      let tl = new TimelineMax();
      tl.set(this.$refs.text, { opacity: 1 }, 0);
      tl.staggerTo(this.$refs.text, 0.75, { xPercent: 0 }, 0.1, 0);
      tl.to(this.$refs.line, .55, { width: "30vw", ease: Power1.easeOut }, 0.3);
      tl.to(this.$refs.desc, 0.75, { yPercent: 0, opacity: 1 }, 0.3);
    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY > window.innerHeight) return;
      window.requestAnimationFrame(()=>{
        this.$refs.bg.style.transform = `translate3D(0px, ${(window.scrollY / 2).toFixed(2)}px,0)`;
      })
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
  padding: 0px 120px;
}

#intro .text{
  flex: 0 0 auto;
  color: white;
  position: relative;
  padding: 40px 0px;
}


#intro .line{
  position: absolute;
  left: 0px;
  height: 2px;
  background: white;
  top: 100%;
  width: 30vw;
}

.mobile #intro .line{
  position: relative;
  top: 0px;
  margin: 40px 0px;
}

#intro .text h1{
  line-height: 93%;
  font-size: 8vw;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.mobile #intro .text h1{
  font-weight: 400;
  line-height: 90%;
  font-size: 9vw;
  letter-spacing: -1px
}

#intro .description{
  position: absolute;
  top: 100%;
  left: 35vw;
  width: 400px;
  max-width: 50vw;
  font-size: 14px;
  line-height: 24px;
  margin-top: -7px;
}

.mobile #intro .description{
  position: relative;
  left: 0px;
  top: 0px;
  max-width: 80vw;
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
  background-position: center
}
</style>
