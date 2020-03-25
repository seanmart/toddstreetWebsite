<template lang="html">
  <div class="circle-link" :style="styles">
    <nuxt-link :to="to" :class="{hover}">
      <slot/>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props:{
    size: {type: Number, default: 100},
    to:{String, default: '/'},
    hover:{type: Boolean, default: true}
  },
  computed:{
    styles(){
      return{
        height: this.size + 'px',
        width: this.size + 'px',
      }
    }
  }
}
</script>

<style lang="scss">
  .circle-link{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @include font('button');

    a{
      height: 100%;
      width: 100%;
      flex: 0 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      box-sizing: content-box;
      padding: 1vw;
      transition: padding .25s;

      color: $snow;
      background: $midnight;

      &.hover:hover{
        padding: 2vw;
      }
    }
  }
</style>
