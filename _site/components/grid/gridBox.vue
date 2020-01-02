<template lang="html">
  <div :class="['grid-box', boxWidth]" :style="animation">
    <div class="grid-inner-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boxWidth: String,
    index: { type: Number, default: -1 }
  },
  computed: {
    animation() {
      let x = this.index / 6
      return x >= 0 ? { animationDelay: `${x}s` } : {}
    }
  }
}
</script>

<style lang="css">
.grid-box{
  flex: 0 0 auto;
  padding: 10px;
  opacity: 0;
  animation: slide-on-up 1s forwards;
}

.grid-box.full{
  width: 100%;
}

.grid-box.third{
  width: 33.333%;
}

.grid-box.fourth{
  width: 25%;
}

.grid-box.half{
  width: 50%;
}

.grid-inner-box{
  display: block;
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 850px){
  .grid-box.half,
  .grid-box.third,
  .grid-box.fourth{
    width: 100%;
  }
}

</style>
