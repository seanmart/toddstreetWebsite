<template lang="html">
  <div :class="['gallery-text container', `slide-on-${dir}`, {left,center,right}]" :key="index">
      <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    left: { type: Boolean, default: true },
    center: Boolean,
    right: Boolean,
    dir: String,
    index: Number
  }
}
</script>

<style lang="css">
.gallery-text{
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 1
}

.gallery-text.left{
  align-items: flex-start;
  text-align: left;
  padding-right: 20px;
}

.gallery-text.center{
  align-items: center;
  text-align: center;
  padding: 0px 20px;
}

.gallery-text.right{
  align-items: flex-end;
  text-align: right;
  padding-left: 20px;
}
.gallery-text.slide-on-left{
  animation: slide-on-left 1s
}


.gallery-text.slide-on-right{
  animation: slide-on-right 1s
}


@media screen and (max-width: 850px){
  .gallery-text.left,
  .gallery-text.right,
  .gallery-text.center{
    align-items: center;
    text-align: center;
    padding: 0px 20px;
  }
}

</style>
