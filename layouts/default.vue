<template>
  <div id="site">
    <div v-if="showTransition" class="cover in" />
    <div
      v-if="!showTransition"
      class="cover out"
      :class="{ show: pauseTransitionOut }"
    />
    <sidebar />
    <navigation />
    <nuxt />
  </div>
</template>
<script>
import sidebar from "@/components/sidebar";
import navigation from "@/components/navigation";
export default {
  components: { sidebar, navigation },
  data() {
    return {
      pauseTransitionOut: true
    };
  },
  computed: {
    showTransition() {
      return this.$store.state.showTransition;
    }
  },
  mounted() {
    setTimeout(() => {
      this.transitionOff();
      this.pauseTransitionOut = false;
    }, 100);
  },
  watch: {
    $route() {
      this.showTransition && this.transitionOff();
    }
  },
  methods: {
    transitionOff() {
      this.$store.commit("showTransition", false);
      setTimeout(() => {
        this.$store.commit("showSidebar", true);
        this.$store.commit("showNav", true);
      }, 500);
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
  background: #000;
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
  animation: slide-in-bottom 0.5s backwards;
}

.cover.out {
  animation: slide-out-top 0.5s forwards;
}

.cover.out.show {
  animation: none;
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
