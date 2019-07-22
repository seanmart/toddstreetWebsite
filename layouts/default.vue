<template>
  <div id="site">
    <welcome />
    <navigation />
    <nuxt />
  </div>
</template>

<script>
import welcome from "@/components/global/welcome";
import navigation from "@/components/global/navigation";
export default {
  components: { welcome, navigation }
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
  background: black;
  color: white;
}

body {
  min-height: 100%;
  min-height: 100vh;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.max {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.inset {
  padding: 200px 10vw;
}

.space {
  margin-top: 60px;
  margin-bottom: 60px;
}

.space.extra {
  margin-top: 100px;
  margin-bottom: 100px;
}

.space.top {
  margin-bottom: inherit;
}

.space.bottom {
  margin-top: inherit;
}

.flickity-page-dots .dot {
  background: white !important;
}

.tabs.black .flickity-page-dots .dot {
  background: black !important;
}

@media screen and (max-width: 500px) {
  .inset {
    padding: 120px 7vw;
  }
}

@media screen and (min-width: 1200px) {
  .inset {
    padding: 200px 120px;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
