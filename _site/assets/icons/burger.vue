<template lang="html">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 45" class="burger" :class="{['burger-active']:active}">
    <rect class="burger-line top" y="17"   width="35" height="2"/>
    <rect class="burger-line bottom" y="26" width="35" height="2"/>
  </svg>

</template>

<script>
export default {
  name: 'burger',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="css">


  .burger-active .burger-line.top{
    transform:rotate(45deg);
    transform-origin: 43% 47%;

  }
  .burger-active .burger-line.bottom{
    transform:rotate(-45deg);
    transform-origin: 30% 50%;
  }
  .burger-line{
    transition: .25s;
  }

  .burger-line.top{
    margin: 10px 0px 0px
  }

  .burger-line.bottom{
    margin: 7px 0px 10px
  }

</style>
