<template lang="html">
  <header :class="{ active, scrolled, show }">
    <div class="bar is-padding-sides" ref="bar">
      <svg
        class="b"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 252 252"
        @click="active = !active"
      >
        <rect class="top" width="252" height="15" rx="4.46" y="80" />
        <rect class="bottom" y="147" width="252" height="15" rx="4.46" />
      </svg>
      <nuxt-link to="/" class="l"><Logo /></nuxt-link>
    </div>

    <div class="bar-bg" ref="bg" />

    <div class="menu is-padding">
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
  </header>
</template>

<script>
import Logo from '@/components/svg/Logo'
export default {
  components: { Logo },
  computed: {
    nav() {
      return this.$store.state.nav
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
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
      scroll: {
        max: 0,
        last: 0
      }
    }
  },
  methods: {
    handleScroll() {
      const sy = window.scrollY
      const bh = this.$refs.bar.clientHeight
      const bg = this.$refs.bg
      const ls = this.scroll.last
      const ms = this.scroll.max

      bg.style.opacity = (sy - bh) / bh

      this.show = sy > 0 && ((sy < ls && ms > bh) || (ms > bh && sy < bh))
      this.scrolled = sy > bh || this.show
      this.scroll.max = sy > ms ? sy : sy === 0 ? 0 : ms
      this.scroll.last = sy
    }
  }
}
</script>

<style lang="css" scoped>
header{
  position: relative;
  z-index: 100;
}

.bar{
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;
}

.bar .b{
  width: 40px;
  padding: 5px;
}

.bar .l{
  width: 120px;
  margin-left: auto;
}

.bar .b,
.bar .l{
  fill: #111;
}

.bar .l svg,
.bar .b .top,
.bar .b .bottom{
  transform-origin: center;
  transition-delay: 0px;
  transition: fill .2s, transform .25s;
}

.bar-bg{
  z-index: -1;
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
  background: rgba(0,0,0,.9);
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

.active .b,
.active .l svg{
  transition-delay: .3s;
  fill: #fff;
}

.active .b .top{
  transform: translateX(-10%) rotate(45deg);
}

.active .b .bottom{
  transform: translateY(-18%) translateX(-8%) rotate(-45deg);
}

.active .bar{
  top: -80px;
  transform: translateY(100%);
  position: fixed;
}

.active .bar-bg{
  transition-delay: .45s;
  background: rgba(0,0,0,0);
  box-shadow: none;
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
</style>
