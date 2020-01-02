<template lang="html">
  <nuxt-link :to="to" class="gallery-link">
    <h5><slot></slot></h5>
    <div v-if="duration" :style="{animationDuration: `${duration - .25}s`}" class="timer"/>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: String,
    duration: Number
  }
}
</script>

<style lang="css">
.gallery-link{
  border-radius: 2px;
  margin: 50px 0px;
  position: relative;
  padding: 13px 17px;
  overflow: hidden;
}

.gallery-link h5{
  line-height: normal;
}

.gallery-link .timer{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: white;
  opacity: .4;
  animation: link-bar linear
}

@keyframes link-bar{
  0%{
    opacity: 0;
    transform: translateX(-100%);
  }

  100%{
    opacity: .4;
    transform: translateX(0px;);

  }
}

</style>
