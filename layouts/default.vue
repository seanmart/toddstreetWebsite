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

.title {
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 20px;
}

@media screen and (max-width: 800px) {
  .title {
    font-size: 30px;
  }
}

@media screen and (max-width: 700px) {
  .inset {
    padding: 5vw;
  }
}

@media screen and (max-width: 600px) {
  .title {
    font-size: 28px;
  }
}
</style>
