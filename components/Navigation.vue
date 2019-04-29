<template lang="html">
  <header :class="{ active, scrolled, show }">
    <div class="bar is-padding-sides" ref="bar">
      <div class="is-max-width inner-bar">
        <Burger @clicked="active = !active" :on="active" />
        <Logo class="logo" @click.native="$router.push('/')" />
      </div>
    </div>

    <div class="bar-bg" ref="bg" />

    <div class="menu is-padding">
      <div class="inner-menu is-max-width">
        <div class="column links">
          <h4>Links</h4>
          <template v-for="(l, i) in nav">
            <nuxt-link :key="i" :to="l.route" @click.native="active = false">
              <h2>{{ l.label }}</h2>
            </nuxt-link>
          </template>
        </div>
        <div class="column info">
          <h4>Information</h4>
          <span>{{ company }}</span>
          <span>{{ street }}</span>
          <span>{{ city }}, {{ state }}, {{ zip }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "@/components/svg/Logo";
import Burger from "@/components/svg/Burger";
export default {
  components: { Logo, Burger },
  computed: {
    nav() {
      return this.$store.state.nav;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      company: this.$store.state.information.company,
      street: this.$store.state.information.address.street,
      city: this.$store.state.information.address.city,
      state: this.$store.state.information.address.state,
      zip: this.$store.state.information.address.zip,
      scrolled: false,
      active: false,
      show: false,
      color: "#000",
      scroll: {
        max: 0,
        last: 0
      }
    };
  },
  methods: {
    handleScroll() {
      const sy = window.scrollY;
      const bh = this.$refs.bar.clientHeight;
      const co = document.getElementById("content");
      const bg = this.$refs.bg;
      const ls = this.last;
      const ms = this.max;
      const o = (sy - st + bh * 2) / bh;
      const st = co ? co.offsetTop : 0;

      bg.style.opacity = o < 0 ? 0 : o > 1 ? 1 : o;

      this.show = sy > 0 && ((sy < ls && ms > bh) || (ms > bh && sy < bh));
      this.scrolled = sy > bh || this.show;
      this.max = sy > ms ? sy : sy === 0 ? 0 : ms;
      this.last = sy;
    }
  }
};
</script>

<style lang="css" scoped>
header{
  position: relative;
  z-index: 100;
}

.bar{
  position: absolute;
  z-index: 1;
}

.inner-bar{
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo{
  width: 150px;
  max-width: 25vw;
  margin-left: auto;
}

.bar svg{
  fill: #000;
  cursor: pointer;
}

.bar-bg{
  z-index: -1;
  position: relative;
  background: white;
  box-shadow: 0px 0px 4px rgba(0,0,0,.1)
}

.bar, .bar-bg{
  top: 0px;
  left: 0px;
  right: 0px;
  height: 80px;
  transform: translateY(0px);
}

.scrolled .bar,
.bar-bg{
  top: -80px;
  position: fixed;
  transition: transform .3s, background .0s, box-shadow .2s;
}

.show .bar,
.show .bar-bg{
  transform: translateY(100%);
}

.menu{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  transform: translateY(150%);
  transition: transform .5s;
  background: #000
}

.inner-menu{
  display:flex;
  justify-content: center;
  align-items: stretch;
  color: white;
}

.column{
  flex: 1 1 auto;
  padding-top: 70px;
}

.column h4{
  color: #555;
  margin-bottom: 20px;
}

.column h2{
  font-weight: 400
}

.column *::after{
  content: "\A";
  white-space: pre;
}

.active .menu{
  transform: translateY(0px);
}

.active .bar{
  top: -80px;
  transform: translateY(100%);
  position: fixed;
}

.active .bar svg{
  animation: fill .5s forwards
}

@media screen and (max-width: 700px){
  .menu{
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }

  .column .links{
    flex: 1 1 auto;
  }

  .column h2{
    font-size: calc(1em + 2vw)
  }
}

@keyframes fill{
  0%{
    fill: #000;
  }
  72%{
    fill: #000;
  }
  82%{
    fill: #fff
  }
  100%{
    fill: #fff
  }
}
</style>
