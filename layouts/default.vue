<template>
  <div id="site">
    <welcome />
    <navigation />
    <nuxt />
  </div>
</template>

<script>
import welcome from "@/components/welcome";
import navigation from "@/components/navigation";
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

html {
  height: 100%;
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

#site {
  overflow-x: hidden;
}

.max {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.inset {
  padding: 20vw 10vw;
}

@media screen and (min-width: 1200px) {
  .inset {
    padding: 240px 120px;
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
