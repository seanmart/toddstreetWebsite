<template lang="html">
  <div id="sidebar" :class="{ show }">
    <div class="content">
      <div class="logo">
        <nuxt-link to="/"><Logo /></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";
import Logo from "@/components/svg/Logo";
export default {
  components: { Logo },
  computed: {
    show() {
      return this.$store.state.showSidebar;
    }
  }
};
</script>

<style lang="css">
#sidebar{
  width: 100px;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: black;
  z-index: 90;
  transform: translateX(-100%);
  transition: transform .25s;
  transition-delay: .2s;
}

#sidebar .content{
  position: absolute;
  top: 100%;
  left: 0px;
  height: 100px;
  width: 100%;
  transform: rotate(-90deg);
  transform-origin: top left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 50px;
}

#sidebar .logo{
  transform: translateX(50%);
  transition:  .25s;
  transition-delay: 0;
  opacity: 0;
}

#sidebar .logo svg{
  width: 150px;
  fill: white;
}

#sidebar.show{
  transform: translateX(0px);
  transition-delay: 0s;
}

#sidebar.show .logo{
  transition-delay: .35s;
  transform: translateX(0px);
  opacity: 1;
}

@media screen and (max-width: 700px){
  #sidebar{
    width: 100%;
    height: 100px;
  }

  #sidebar .content{
    transform: rotate(0deg);
    top: 0px;
  }
}
</style>
