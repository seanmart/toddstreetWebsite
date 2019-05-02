<template>
  <header :class="{ hide, expand, transition }">
    <block extend class="top-bar-block">
      <container bar class="top-bar">
        <Menu class="menu-button" @clicked="hide = !hide" :on="!hide" />
        <nuxt-link to="/" class="logo-button">
          <Logo />
        </nuxt-link>
      </container>
    </block>
    <div class="nav-background" />
    <block fullheight black extend class="bottom-menu">
      <container gallery>
        <box class="links" col2>
          <nav>
            <nuxt-link :to="link.route" v-for="(link, i) in links" :key="i">
              <t body big white @click.native="hide = true">{{ link.label }}</t>
            </nuxt-link>
          </nav>
        </box>
        <box class="info" col2> </box>
      </container>
    </block>
  </header>
</template>
<script>
import Menu from '@/components/svg/Menu'
import Logo from '@/components/svg/Logo'
export default {
  components: { Menu, Logo },
  data() {
    return {
      links: this.$store.state.nav,
      hide: true,
      expand: true,
      transition: false,
      timeout: null
    }
  },
  watch: {
    hide() {
      this.transition = true
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => (this.transition = false), 500)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.expand = window.scrollY < 50
    }
  }
}
</script>
<style>
.top-bar,
.nav-background {
  height: 80px;
}

.top-bar-block {
  position: fixed;
  z-index: 101;
  top: 0px;
}

.nav-background {
  position: fixed;
  z-index: 99;
  background: white;
  top: 0px;
  left: 0px;
  right: 0px;
  opacity: 1;
  transition: opacity 0.25s;
}

.expand .nav-background {
  opacity: 0;
}

.menu-button {
  position: relative;
  left: -5px;
}

.menu-button svg {
  display: block;
}
.logo-button {
  margin-left: auto;
}

.logo-button svg {
  width: 150px;
  max-width: 35vw;
}

.bottom-menu {
  position: fixed;
  z-index: 100;
  transition: transform 0.5s;
  padding-top: 100px;
  top: 0px;
  left: 0px;
}

.hide .bottom-menu {
  transform: translateY(150%);
}

.hide .menu-button,
.hide .logo-button {
  fill: #000;
  transition-delay: 0s;
}

.menu-button,
.logo-button {
  fill: #fff;
  transition: fill 0s;
  transition-delay: 0.36s;
}

nav a {
  padding: 5px;
  display: block;
  transition: opacity 0.5s, transform 0.2s;
  transform-origin: left;
}

nav:hover a {
  opacity: 0.2;
}

nav a:hover {
  opacity: 1;
}

nav a:active {
  transform: scale(0.97);
}

@media screen and (min-width: 601px) {
  .transition .top-bar-block {
    transition: top 0.5s;
  }

  .expand.hide .top-bar-block {
    top: 50px;
    position: absolute;
  }
}
</style>
