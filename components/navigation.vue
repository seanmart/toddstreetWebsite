<template lang="html">
  <div id="navigation">
    <nav class="top" ref="top">
      <template v-for="(page, i) in pages">
        <div class="top-link" ref="link" :key="i">
          <nuxt-link :to="page.path" active-class="active">
            <span>{{ page.label }}</span>
          </nuxt-link>
        </div>
      </template>
    </nav>
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
    },
    ready() {
      return this.$store.state.ready;
    }
  },
  watch: {
    mobile(mobile) {
      this.$store.dispatch("mobile", mobile);
    }
  },
  methods: {
    handleResize() {
      this.mobile = window.innerWidth < this.navWidth + 300;
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

.top-link{
  flex: 0 0 auto;
}


nav.top a{
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

nav.top a.active span{
  border-bottom: 2px solid;
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
