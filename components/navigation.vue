<template lang="html">
  <div class="navbar" ref="nav">
    <header :class="{ stick }">
      <div class="wrapper">
        <nuxt-link to="/"><logo class="logo"/></nuxt-link>
        <div class="mobile-wrapper">
          <nav>
            <nuxt-link v-for="(page, i) in pages" :to="page.path" :key="i">
              {{ page.label }}
            </nuxt-link>
          </nav>
          <btn red medium caps>
            connect with us
          </btn>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import btn from "./button";
import logo from "@/components/svg/Logo";
import { filter, orderBy } from "lodash";
export default {
  components: { btn, logo },
  data() {
    return {
      stick: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    pages() {
      return orderBy(this.$store.state.pages, "nav");
    }
  },
  methods: {
    handleScroll() {
      this.stick = this.$refs.nav.getBoundingClientRect().top <= 0;
    }
  }
};
</script>

<style lang="css" scoped>
.navbar, header{
  height: 65px;
}

header{
  padding: 0px 20px;
  border-bottom: 1px solid #333;
  border-top: 1px solid #333;
  background: black;
  color: white;
}

header.stick{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 100;
}

.wrapper{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}

.logo{
  width: 130px;
  fill: white;
}

.mobile-wrapper{
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}

nav{
  padding: 0px 20px;
}

nav a{
  color: white;
  padding: 20px;
  font-size: .7em;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  display: inline-block;
  transition: .25s;
  font-weight: 700
}

nav a:hover{
  font-weight: 900
}

@media screen and (max-width:700px){
  .mobile-wrapper{
    display: none;
  }
}
</style>
