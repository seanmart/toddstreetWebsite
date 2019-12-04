<template lang="html">
  <div class="image">
    <div
    class="inner-image"
    :style="{backgroundImage: `url(${image})`}"
    data-scroll
    data-scroll-speed="-1.5"
    />
  </div>
</template>

<script>
export default {
  props:{
    image:{type: String,default: null}
  },
}
</script>

<style lang="scss">
  .image{
    background: $bg2;
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .inner-image{
    position: absolute;
    width: 100%;
    left: 0px;
    top: -20%;
    bottom: -20%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
