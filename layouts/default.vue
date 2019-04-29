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
  background: #eee;
  color: #111;
}

html,
body {
  overflow-x: hidden;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.line-top {
  border-top: 1px solid #eee;
}

.shadow {
  box-shadow: 0px 10px 20px -20px rgba(0, 0, 0, 0.5);
}

/* ---- colors ---- */
.is-white {
  background: #fff;
}
.is-black {
  background: #000;
}
.is-red {
  background: #f2583e;
}
.is-yellow {
  background: #ffac0c;
}
.is-blue {
  background: #43bae1;
}
.is-grey {
  background: #f6f6f6;
}

.text-blue {
  color: #43bae1;
  fill: #43bae1;
}
.text-red {
  color: #f2583e;
  fill: #f2583e;
}
.text-yellow {
  color: #ffac0c;
  fill: #ffac0c;
}
.text-white {
  color: #fff;
  fill: #fff;
}

/* ---- padding ---- */
.is-max-width {
  max-width: 1500px;
  margin: 0px auto;
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

.avoid-nav {
  padding-top: 240px;
}

/* ---- fonts ---- */

h1 {
  font-size: calc(2em + 0.5vw);
}

h1.title {
  font-weight: 900;
  text-align: center;
}

h2 {
  font-size: calc(1.5em + 0.5vw);
}

h3 {
  font-size: calc(1em + 0.5vw);
}

h4 {
  font-size: calc(0.9em + 0.2vw);
}

h5 {
  font-size: calc(0.3em + 0.75vw);
}

span.small {
  font-size: calc(0.7em + 0.1vw);
}

p.big {
  font-size: calc(1em + 0.5vw);
  line-height: calc(1.4em + 0.2vw);
  margin-bottom: 20px;
}

p.grey {
  color: #999;
}

span,
p,
a {
  font-family: "Roboto Slab", serif;
}

a {
  text-decoration: none;
  color: inherit;
}

@media screen and (min-width: 1500px) {
  h1 {
    font-size: 53.5px;
  }

  h3 {
    font-size: 23.495px;
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

  p.big {
    font-size: 23.495px;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
