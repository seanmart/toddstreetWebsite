<template>
  <header :class="{ hide }">
    <container sides flex row middle class="top-bar">
      <Menu class="menu-button" @clicked="hide = !hide" :on="!hide" />
      <nuxt-link to="/" class="logo-button">
        <Logo />
      </nuxt-link>
    </container>
    <container class="menu" sides bottom fullblack cover mobile row>
      <box class="links" half mobile>
        <t subtitle thick grey>Links</t>
        <nav>
          <nuxt-link :to="link.route" v-for="(link, i) in links" :key="i">
            <t body big white @click.native="hide = true">{{ link.label }}</t>
          </nuxt-link>
        </nav>
      </box>
      <box class="info" half> </box>
    </container>
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
      hide: true
    }
  }
}
</script>
<style>
.top-bar {
  height: 80px;
  position: fixed;
  z-index: 101;
  top: 0px;
  left: 0px;
  right: 0px;
}

.logo-button {
  margin-left: auto;
}
.logo-button svg {
  width: 150px;
  max-width: 25vw;
}

.menu-button {
  padding: 5px;
  margin-left: -5px;
}

.menu {
  position: fixed;
  z-index: 100;
  transition: transform 0.5s;
  padding-top: 100px;
}
.hide .menu {
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
  transition-delay: 0.35s;
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
</style>
