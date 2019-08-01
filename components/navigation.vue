<template lang="html">
  <div id="navigation" :class="{ show }">
    <nav class="top" ref="top">
      <template v-for="(page, i) in pages">
        <nuxt-link :key="i" :to="page.path" :style="delay(i)">
          {{ page.label }}
        </nuxt-link>
      </template>
    </nav>
    <div class="menu-button" :class="{ show: showMenuButton }">☰</div>
    <nav class="side">
      <div class="pages">
        <template v-for="(page, i) in pages">
          <nuxt-link :key="i" :to="page.path">{{ page.label }}</nuxt-link>
        </template>
      </div>
      <div class="contact">
        this is the contact info
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenuButton: false,
      showTopNav: true
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    this.handleScroll();
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    pages() {
      return this.$store.getters.pages;
    },
    show() {
      return this.showTopNav && this.$store.state.showNav;
    }
  },
  methods: {
    delay(i) {
      return { transitionDelay: `.${i}s` };
    },
    handleScroll() {
      if (!this.showTopNav) return true;
      this.showMenuButton = window.scrollY > this.$refs.top.offsetHeight - 20;
    },
    handleResize() {
      this.showTopNav = window.innerWidth > this.$refs.top.offsetWidth;
      this.showMenuButton = !this.showTopNav;
    }
  }
};
</script>

<style lang="css">
#navigation{
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  text-align: center;
  z-index: 100
}

nav.top{
  padding: 0px 120px;
  display: inline-block;
  white-space: nowrap;
}

nav.top a{
  display: inline-block;
  padding: 20px 40px;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 2px;
  transform: translateY(-100%);
  transition: transform .25s
}

#navigation.show nav.top a{
  transform: translateY(0px);
}

#navigation .menu-button{
  color: white;
  font-size: 40px;
  line-height: 40px;
  height: 100px;
  width:100px;
  padding: 30px;
  position: fixed;
  top: 0px;
  right: 0px;
  transform: translateX(100%);
  transition: transform .25s;
}

#navigation .menu-button.show{
  transform: translateX(0px);
}

nav.side{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  transform: translateX(100%);
}
</style>
