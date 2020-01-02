<template>
  <div>
    <Navigation />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
export default {
  components: { Navigation, Footer }
}
</script>

<style>
html {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #fff;
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

a {
  text-decoration: none;
  color: inherit;
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
</style>
