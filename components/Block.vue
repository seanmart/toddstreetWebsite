<template>
  <div class="block" :class="blockClasses" :style="styles">
    <div class="wrapper" v-if="!fullwidth" :class="wrapperClasses">
      <slot />
    </div>
    <slot v-if="fullwidth" />
  </div>
</template>
<script>
export default {
  props: {
    fullwidth: Boolean,
    fullheight: Boolean,
    black: Boolean,
    image: String,
    center: Boolean,
    extend: Boolean,
    space: Boolean,
    nav: Boolean
  },
  computed: {
    blockClasses() {
      return {
        fullheight: this.fullheight,
        black: this.black,
        image: this.image ? true : false,
        space: this.space,
        nav: this.nav
      }
    },
    wrapperClasses() {
      return {
        center: this.center,
        extend: this.extend
      }
    },
    styles() {
      let styles = {}
      if (this.image) styles.backgroundImage = `url(${this.image})`
      return styles
    }
  }
}
</script>
<style>
.block {
  width: 100%;
}

.block.image {
  background-size: cover;
  background-position: center bottom;
}

.block.black {
  background: black;
}

.block.fullheight {
  height: 100vh;
}

.block.space {
  padding-top: 50px;
  padding-bottom: 50px;
}

.block.nav {
  padding-top: 180px;
}

.wrapper {
  width: 100%;
  max-width: 1400px;
  margin: 0px auto;
}

.wrapper.extend {
  width: 100%;
  max-width: 1500px;
  margin: 0px auto;
}

.wrapper.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media screen and (max-width: 600px) {
  .block.nav {
    padding-top: 80px;
  }
}
</style>
