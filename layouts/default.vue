<template>
  <div id="site" :class="{ mobile }">
    <div id="cover" />
    <navigation />
    <sidebar />
      <nuxt />
  </div>
</template>
<script>
import sidebar from "@/components/sidebar";
import navigation from "@/components/navigation";
export default {
  components: { sidebar, navigation },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.$store.commit("scrolled", window.scrollY > this.scrolledThreshold)

    this.$nextTick(() => {
      this.$store.dispatch("animation/init");
      this.$store.dispatch("animation/transition", false);
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      scrolled: false,
      scrolledThreshold: 50
    };
  },
  computed: {
    mobile() {
      return this.$store.state.mobile;
    },
    transitioning(){
      return this.$store.state.transitioning
    }
  },
  watch: {
    scrolled(scrolled) {
        this.$store.dispatch("scrolled", scrolled);
    },
    $route() {
      this.$nextTick(()=>this.$store.dispatch("animation/transition", false))
    }
  },
  methods: {
    handleScroll() {
      if (this.mobile || this.transitioning) return
      this.scrolled = window.scrollY > this.scrolledThreshold;
    }
  }
};
</script>
<style>
html {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #111;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

#cover {
  background: black;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1000;
}

.inset {
  padding: 100px 120px;
  transition: padding 0.25s;
  transition-delay: 0.25s;
}

.inset.wide {
  padding-left: 80px;
  padding-right: 0px;
}

.mobile .inset {
  padding: 100px 30px;
}
</style>
