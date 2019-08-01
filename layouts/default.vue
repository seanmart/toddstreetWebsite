<template>
  <div id="site">
    <cover />
    <sidebar />
    <navigation />
    <nuxt />
  </div>
</template>
<script>
import sidebar from "@/components/sidebar";
import navigation from "@/components/navigation";
import cover from "@/components/cover";
export default {
  components: { sidebar, navigation, cover },
  mounted() {
    this.transitionEnd();
  },
  watch: {
    $route() {
      this.transitionEnd();
    }
  },
  methods: {
    transitionEnd() {
      this.$store.dispatch("transitionEnd").then(() => {
        this.$store.commit("setAnimationShow", "intro");
      });
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

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}

@keyframes slide-in-top {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0px);
  }
}

@keyframes slide-in-bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0px);
  }
}

@keyframes slide-out-top {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-100%);
  }
}

@keyframes slide-out-bottom {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(100%);
  }
}

.inset {
  padding: 100px;
}

@media screen and (max-width: 700px) {
  .inset {
    padding: 100px 5vw;
  }
}
</style>
