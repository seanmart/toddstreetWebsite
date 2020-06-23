<template lang="html">
  <div id="loading">
    <div class="content"><icon logo/></div>
  </div>
</template>

<script>
export default {
  mounted(){
    if (scroller.touch()) gsap.set('#loading', {height: window.innerHeight})
  }
}
</script>

<style lang="scss">
#loading{
  position: fixed;
  top: 0px;
  left: 0px;
  background: black;
  z-index: 1000;
  .content{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    svg{
      flex: 0 0 auto;
      fill: white;
      width: 400px;
      max-width: 70vw;
      transform: translateY(100%);
      opacity: 0;
    }
  }
}
</style>
