<template lang="html">
  <div id="navigation">
    <nav class="top" ref="top">
      <template v-for="(page, i) in pages">
        <div class="top-link" ref="link" :key="i">
          <nuxt-link :to="page.path" active-class="active">
            <span>{{ page.name }}</span>
          </nuxt-link>
        </div>
      </template>
    </nav>
    <nav id="side-nav" class="side" ref="side">
      <template v-for="(page, i) in pages">
        <div class="side-link">
          <nuxt-link :key="i" :to="page.path" active-class="active">
            <span>{{ page.name }}</span>
          </nuxt-link>
        </div>
      </template>
    </nav>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";
export default {
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.getNavWidth();
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  data() {
    return {
      mobile: false,
      sideNav: false
    };
  },
  computed: {
    pages() {
      return this.$store.getters["data/pages"];
    },
    scrolled() {
      return this.$store.state.scrolled;
    }
  },
  watch: {
    mobile(mobile) {
      mobile && this.$store.dispatch("mobile", mobile);
    }
  },
  methods: {
    handleResize() {
      this.mobile = window.innerWidth < this.navWidth + 200;
    },
    getNavWidth() {
      let reducer = (tally, link) => tally + link.offsetWidth;
      this.navWidth = this.$refs.link.reduce(reducer, 0);
    }
  }
};
</script>

<style lang="css">
#navigation{
  width: 100%;
  position: relative;
  z-index: 100;
}

nav.top{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  overflow: hidden;
}

nav .top-link{
  flex: 0 0 auto;
}

nav a{
  padding: 20px 40px;
  display: block;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 2px;
}

nav.top span{
  display: inline-block;
  padding: 7.5px 0px;
}

nav a.active span,
nav.top a:hover span{
  border-bottom: 2px solid;
}

#side-nav{
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  background: black;
  color: white;
  padding: 70px;
  max-width: 100%;
}

.mobile #side-nav{
  width: 100%;
}

nav .side-link a{
  font-weight: 400;
  font-size: 20px;
}


</style>
