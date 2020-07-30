<template lang="html">
  <ul id="bars"><li v-for="i in 5" :key="i"/></ul>
</template>

<script>

export default {

}
</script>

<style lang="scss">
#bars{
  pointer-events: none;
  position: fixed;
  @include fullscreen;
  @include flex-row;
  z-index: 100;
  li{
    flex: 1 1 auto;
    background: #000111;
  }

  @media (max-width: $mobile){
    li:last-child{
      display: none;
    }
  }
}
</style>
