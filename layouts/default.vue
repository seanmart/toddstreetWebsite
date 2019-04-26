<template>
  <div>
    <Navigation />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
export default {
  components: { Navigation, Footer }
};
</script>

<style>
html {
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #f2f2f2;
  color: #111;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

section {
  min-height: 100vh;
}

.is-max-width {
  max-width: 1500px;
  margin: 0px auto;
}

.is-dark {
  background: #000;
  color: white;
}

.is-padding,
.is-padding-left,
.is-padding-sides {
  padding-left: 80px;
}

.is-padding,
.is-padding-right,
.is-padding-sides {
  padding-right: 80px;
}

.is-padding,
.is-padding-top {
  padding-top: 80px;
}

.is-padding,
.is-padding-bottom {
  padding-bottom: 80px;
}

@media screen and (max-width: 700px) {
  .is-padding,
  .is-padding-left,
  .is-padding-sides {
    padding-left: 7vw;
  }

  .is-padding,
  .is-padding-right,
  .is-padding-sides {
    padding-right: 7vw;
  }
}

.line-top {
  border-top: 1px solid #eee;
}

.content {
  background: white;
  min-height: 100vh;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-weight: 900;
  font-size: calc(1.8em + 1vw);
  text-align: center;
}

.red {
  color: #f2583e;
  fill: #f2583e;
}
.blue {
  color: #43bae1;
  fill: #43bae1;
}
.yellow {
  color: #ffac0c;
  fill: #ffac0c;
}

h2 {
  font-size: calc(1em + 1vw);
}

h3 {
  font-size: calc(1em + 0.5vw);
}

h4 {
  font-size: calc(1em + 0.2vw);
}

h5 {
  font-size: calc(1em + 0.7vw);
  font-weight: 500;
  margin: 0px auto 1em;
  max-width: 850px;
  text-align: center;
  color: #999;
  line-height: 1.5em;
}

h5:last-child {
  margin-bottom: 0px;
}

span.small {
  font-size: calc(0.7em + 0.2vw);
}

a {
  text-decoration: none;
  color: inherit;
}

@media screen and (min-width: 1500px) {
  h1 {
    font-size: 53.5px;
  }

  h4 {
    font-size: 19px;
  }

  h5 {
    font-size: 26.5px;
  }

  span.small {
    font-size: 14.2px;
  }
}
</style>
