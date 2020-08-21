<template lang="html">
  <nav id="top-nav" class="h5 caps loose">
      <nuxt-link class="logo" to="/"><span><icon logo/></span></nuxt-link>
      <nuxt-link class="link" to="/about"> <span>about</span> </nuxt-link>
      <nuxt-link class="link" to="/care"> <span>we care</span> </nuxt-link>
      <nuxt-link class="link" to="/contact"> <span>contact</span> </nuxt-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#top-nav{
  z-index: 99;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: $nav-d;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: $space-ld;
  padding-right: $space-rd;

  .logo{
    width: 200px;
    margin-right: auto;
    overflow: hidden;
  }

  .link{
    flex: 0 0 auto;
    margin-left: $space-ld;
    overflow: hidden;
  }

  span{
    display: block;
  }

  @media (max-width: $tablet){
    height: $nav-t;
    padding-left: $space-lt;
    padding-right: $space-rt;

    .logo{
      width: 175px;
    }

    .link{
      display: none;
    }
  }

  @media (max-width: $mobile){
    height: $nav-m;
    padding-left: $space-lm;
    padding-right: $space-rm;

    .logo{
      width: 150px;
    }
  }
}
</style>
