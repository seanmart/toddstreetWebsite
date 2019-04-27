<template lang="html">
  <header :class="{ active }">
    <div ref="header" class="header-bar" :class="headerStyles">
      <div class="wrapper is-padding-sides">
        <Bars :color="color" :active="active" @clicked="active = $event" />
        <nuxt-link to="/"><Logo :style="{ fill: color }"/></nuxt-link>
      </div>
    </div>
    <div class="header-menu">
      <Menu :active="active" @clicked="active = false" />
    </div>
  </header>
</template>

<script>
import Logo from "@/components/svg/Logo";
import Bars from "./Bars";
import Menu from "./Menu";
export default {
  components: { Logo, Bars, Menu },
  data() {
    return {
      active: false,
      scrolling: false,
      show: false,
      maxScroll: 0,
      lastScroll: 0,
      color: this.colorOnPage
    };
  },
  computed: {
    headerStyles() {
      if (this.active) return;
      return { scrolling: this.scrolling, show: this.show,  };
    }
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    close() {
      this.active = false;
    },
    handleScroll() {
      if (this.active) return;

      const sy = window.scrollY;
      const hh = this.$refs.header.clientHeight;
      const ls = this.lastScroll;
      const ms = this.maxScroll;

      // set header
      this.scrolling = sy > ls && sy > hh;
      this.show = sy > 0 && ((sy < ls && ms > hh) || (ms > hh && sy < hh));
     
      // set scroll
      this.maxScroll = sy > ms ? sy : sy === 0 ? 0 : ms;
      this.lastScroll = window.scrollY;
    }
  }
};
</script>

<style lang="css" scoped>

header{
  position: relative;
  z-index: 100
}

.header-bar{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 80px;
  z-index: 1;
  transition: background .5s;
}

.header-bar .wrapper{
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}


.header-bar.scrolling{
  position: fixed;
  transition: translateY .5s;
  transform: translate(0px, -100%);
}

.header-bar.show{
  position: fixed;
  transform: translateY(100%);
}


.header-bar.show,
.header-bar.scrolling,
.active .header-bar{
  background: white;
  border-bottom: 1px solid #eee;
}

.header-bar a{
  width: 30vw;
  max-width: 120px;
  display: inline-block;
  line-height: 0px;
  margin-left: auto;
}

.header-menu{
  font-family: 'Miriam Libre', sans-serif;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  transform: translateY(150%);
  transition: transform .5s;
  background: black;
  color: white;
  padding-top: 80px;
}

.active .header-bar{
  position: fixed;
}

.active .header-menu{
  transform: translateY(0px);
}
</style>
