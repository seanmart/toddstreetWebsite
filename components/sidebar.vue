<template lang="html">
  <div id="sidebar">
    <div class="logo-container" :class="{ show: logo.show }">
      <nuxt-link class="logo" to="/">
        <Logo :style="{ transitionDuration: logo.duration / 1000 + 's' }" />
      </nuxt-link>
    </div>
    <div
      class="background"
      :class="{ show: sidebar.show }"
      :style="{ transitionDuration: sidebar.duration / 1000 + 's' }"
    />
  </div>
</template>

<script>
import { TimelineMax } from "gsap";
import Logo from "@/components/svg/Logo";
export default {
  components: { Logo },
  computed: {
    sidebar() {
      return this.$store.state.animations.sidebar;
    },
    logo() {
      return this.$store.state.animations.logo;
    }
  }
};
</script>

<style lang="css">
#sidebar{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 100vh;
  z-index: 100;
}

#sidebar .background{
  background: black;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  transform: translateX(-100%);
  transition: transform;
}

#sidebar .background.show{
  transform: translateX(0px);
}

#sidebar .logo-container{
  position: absolute;
  bottom: 70px;
  left: 0px;
  right: 0px;
  height: 150px;
  z-index: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

#sidebar .logo{
  display: inline-block;
  transform: rotate(-90deg);
}

#sidebar .logo svg{
  fill: white;
  width: 150px;
  transform: translateX(-100%);
  transition-property: transform;
}

#sidebar .logo-container.show svg{
  transform: translateX(0px);
}

@media screen and (max-width: 700px){
  #sidebar{
    width: 100%;
    height: 80px;
  }

  #sidebar .background{
    transform: translateY(-100%);
  }

  #sidebar.show .background{
    transform: translateY(0px);
  }

  #sidebar .logo-container{
    top: 0px;
    right: auto;
    height: 80px;
    left: 20px;
  }

  #sidebar .logo{
    transform: rotate(0deg)
  }

  #sidebar.show .logo svg{

  }

}
</style>
