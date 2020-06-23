<template lang="html">
  <header class="space--lr">
    <nav class="link--font">
      <nuxt-link to="/" class="logo"><icon logo/></nuxt-link>
      <nuxt-link to="/about">about</nuxt-link>
      <nuxt-link to="/care">we care</nuxt-link>
      <nuxt-link to="/contact">contact</nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="scss">
header{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: content-box;
  height: $space--dk;

  nav{
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  a{
    flex: 0 0 auto;
    margin-left: 40px;
    text-decoration: none;
    box-sizing: content-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo{
    display: block;
    margin: 0px;
    width: 200px;
    margin-right: auto;
  }

  @media (max-width: $tablet){
    height: $space--tb;

    a{
      display: none;
      &:first-child{
        display: block;
      }
    }
  }

  @media (max-width: $mobile){
    height: $space--mb;

    .logo{
      width: 170px;
    }
  }
}
</style>
