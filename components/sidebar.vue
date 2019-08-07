<template lang="html">
  <div id="sidebar">
    <div id="menu-button" @click="sideNavToggle">☰</div>
    <div class="logo-container">
      <div id="logo">
        <nuxt-link to="/"><Logo /></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/svg/Logo";
import { TimelineMax, TweenLite } from "gsap";
export default {
  components: { Logo },
  methods: {
    sideNavToggle() {
      let open = !this.$store.state.menu
      this.$store.commit("menu", open)
      this.$store.dispatch("animation/menu", open);
    }
  }
};
</script>

<style lang="css">
#sidebar{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 70px;
  height: 100vh;
  z-index: 100;
  overflow: hidden;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 30px;
}

#sidebar.mobile{
  width: 100%;
  height: 70px;
  flex-direction: row;
}

#menu-button{
  cursor: pointer;
  color: white;
  font-size: 30px;
  line-height: 30px;
  height: 70px;
  width:70px;
  padding: 20px;
  position: absolute;
  top: 0px;
  left: 0px;
  text-align: center;
}

.logo-container{
  transform: rotate(-90deg) translateX(50%);
  display: inline-block;
  flex: 0 0 auto;
  overflow: hidden;
}

#sidebar.mobile .logo-container{
  transform: none;
}

#logo svg{
  display: block;
  fill: white;
}

.logo-container, #logo svg{
  width: 150px;
}
</style>
