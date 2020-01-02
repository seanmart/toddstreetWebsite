<template lang="html">
  <div :class="['gallery-image-container', dir]" v-if="image">
    <transition name="image">
      <div
      :class="['gallery-image', {slide, fade}]"
      :key="index"
      :style="{ backgroundImage: `url(${image})`}"
      />

    </transition>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    fade: Boolean,
    slide: Boolean,
    dir: String,
    index: Number
  }
}
</script>

<style lang="css">

.gallery-image{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-size: cover;
}


.fade.image-leave-active{
  z-index: 1;
  transition: opacity 2s
}

.fade.image-leave-to{
  opacity: 0;
}

.gallery-image.slide{
  transform: translateX(0px);
}

.slide.image-leave-active,
.slide.image-enter-active{
  transition: transform 1s;
}

.image-leave.no-crop,
.image-leave-active.no-crop{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

.right .slide.image-leave-to{
  transform: translateX(-100%);
}

.right .slide.image-enter{
  transform: translateX(100%);
}

.left .slide.image-leave-to{
  transform: translateX(100%);
}

.left .slide.image-enter{
  transform: translateX(-100%);
}



</style>
