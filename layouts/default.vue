<template>
  <div id="site">
    <navigation />
    <nuxt />
  </div>
</template>
<script>
import navigation from "@/components/navigation";
export default {
  components: { navigation }
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
  fill: white;
  transition: 0.5s;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.inset {
  padding: 100px;
}

.max {
  max-width: 1200px;
  margin: 0px auto;
}

.white {
  background: white;
  color: black;
  fill: black;
  border-color: #ccc;
}

.blue {
  background: #00acc3;
  color: white;
  fill: white;
  border-color: #white;
}

.slow {
  transition: 1s;
}
</style>
