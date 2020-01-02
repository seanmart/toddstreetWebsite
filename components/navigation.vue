<template lang="html">
  <nav :class="{active: menuActive}" :style="{fill: navColor, color: navColor}">
    <div class="container inner-nav">
      <nuxt-link class="logo" to="/" @click.native="closeMenu">
        <logo></logo>
      </nuxt-link>

      <burger class="burger" :active="menuActive" @click.native="toggleMenu"/>

      <div class="links">
        <template v-for="page in pages">
          <nuxt-link :to="page.path" @click.native="closeMenu">
            {{page.name}}
          </nuxt-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from '@/assets/icons/logo'
import burger from '@/assets/icons/burger'
export default {
  mounted() {
    //window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    //window.removeEventListener('scroll', this.handleScroll)
  },
  components: { logo, burger },
  data() {
    return {
      scrolled: false,
      menuActive: false,
      pages: [
        { name: 'Work', path: '/work' },
        { name: 'About', path: '/about' },
        { name: 'Process', path: '/process' },
        { name: 'Articles', path: '/articles' },
        { name: 'Connect', path: '/connect' }
      ]
    }
  },
  computed: {
    navColor() {
      if (this.menuActive) return this.$store.state.nav.initialNavColor
      return this.$store.state.nav.navColor
    }
  },
  methods: {
    closeMenu() {
      this.menuActive = false
    },
    toggleMenu() {
      this.menuActive = !this.menuActive
    },
    handleScroll() {
      this.scrolled = window.scrollY > 100
    }
  }
}
</script>

<style lang="css">
nav{
  padding: 5rem 0px;
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
  right: 0px;
  animation: fade-on 2.5s;
  display: block;
}

.inner-nav{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo{
  flex: 0 0 auto;
  fill: inherit
}

.logo svg{
  height: 30px;
  fill: inherit;
  transition: inherit
}

.links{
  flex: 0 0 auto;
  margin-left: auto;
  display: flex;
  color: inherit
}

.links a{
  flex: 0 0 auto;
  padding: .5rem 1rem;
  transition: transform .25s, opacity .25s;
  opacity: 1;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  font-size: 1.3em;
}

.links a:hover{
  opacity: .7
}

.burger{
  display: none;
  width: 30px;
}

.burger, .logo{
  position: relative;
  z-index: 1;
}


@media screen and (max-width: 850px){
  nav{
    padding: 9.45vw 0px;
  }
  .burger{
    fill: inherit;
    display: block;
    margin-left: auto;
  }

  .logo svg{
    height: calc(13px + 2vw)
  }
  .links{
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: -100%;
    bottom: 0%;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,.95);
    transition: transform .25s;
  }

  .active .links{
    transform: translateX(100%);
  }

  nav.active{
    position: fixed;
  }

  .links a{
    padding: .5rem;
    font-size: 2.5em;
    font-weight: 700;
  }
}

</style>
