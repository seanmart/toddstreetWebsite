<template lang="html">
  <div id="navigation">
    <nav class="top" ref="top" :class="{ show: showTopNav }">
      <template v-for="(page, i) in pages">
        <nuxt-link
          :key="i"
          :to="page.path"
          :style="{
            transitionDelay: i / 10 + 's',
            transitionDuration: topNav.duration / 1000 + 's'
          }"
        >
          {{ page.label }}
        </nuxt-link>
      </template>
    </nav>
    <div
      class="menu-button"
      :class="{ show: showMenuButton }"
      :style="{ transitionDuration: menuButton.duration / 1000 + 's' }"
    >
      ☰
    </div>
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
  data() {
    return {
      scrolled: false,
      topNavSwitch: false
    };
  },
  computed: {
    pages() {
      return this.$store.getters.pages;
    },
    topNav() {
      return this.$store.state.animations.topNav;
    },
    menuButton() {
      return this.$store.state.animations.menuButton;
    },
    showTopNav() {
      return !this.scrolled && this.topNavSwitch && this.topNav.show;
    },
    showMenuButton() {
      return (this.scrolled || !this.showTopNav) && this.menuButton.show;
    }
  },
  methods: {
    delay(i) {
      return { transitionDelay: `.${i}s` };
    },
    handleScroll() {
      this.scrolled = window.scrollY > this.$refs.top.offsetHeight - 20;
    },
    handleResize() {
      this.topNavSwitch = window.innerWidth > this.$refs.top.offsetWidth;
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
  overflow: hidden;
  max-width: 100%;
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
  transition-property: transform;
}

 nav.top.show a{
  transform: translateY(0px);
}

#navigation .menu-button{
  color: white;
  font-size: 40px;
  line-height: 40px;
  height: 80px;
  width:80px;
  padding: 20px;
  position: fixed;
  top: 0px;
  right: 0px;
  transform: translateX(100%);
  transition-property: transform;
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

@media screen and (max-width: 700px){

  nav.top{
    transform: translateX(-100%);
  }
}
</style>
