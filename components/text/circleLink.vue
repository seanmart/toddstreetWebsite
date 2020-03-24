<template lang="html">
  <button type="button" class="circle-button" ref="button" :class="{hover}">
    <slot/>
    <nuxt-link :to="to" class="circle"/>
  </button>
</template>

<script>
export default {
  props:{
    to:{String, default: '/'},
    hover:{type: Boolean, default: true}
  }
}
</script>

<style lang="scss">
  .circle-button{
    padding: 2vw;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @include font('button');
    color: $snow;

    .circle{
      background: $midnight;
      position: absolute;
      z-index: -1;
      width: 100%;
      padding-bottom: 100%;
      border-radius: 50%;
      transition: transform .25s;
    }

    &.hover:hover{
      .circle{
        transform: scale3d(1.25,1.25,1)
      }
    }
  }
</style>
