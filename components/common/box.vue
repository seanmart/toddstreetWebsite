<template lang="html">
  <div class="box"
    :style="mobile ? {} : styles"
    data-scroll
    data-scroll-delay="1"
    :data-scroll-speed="mobile ? 0 : speed"
    >
    <slot/>
  </div>
</template>

<script>
export default {
  props:{
    styles:{type: Object, default: ()=>{}},
    speed: {type: [Number, String], default: 0}
  },
  computed:{
    mobile(){
      return this.$store.state.mode === 'mobile'
    }
  }
}
</script>

<style lang="scss">
.box{
  user-select: none;
  pointer-events: none;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>
