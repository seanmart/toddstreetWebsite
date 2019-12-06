<template lang="html">
  <div class="box" data-scroll :data-scroll-speed="speed">
    <slot/>
  </div>
</template>

<script>
export default {
  props:{speed: {type:Number, default: 0}}
}
</script>

<style lang="scss">
#site .box{
  position: absolute;
}

@media screen and (max-width: $mobile){
  #site .box{
    position: relative;
    height: 80vh;
    width: 100%;
    padding: 0px;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
  }

}
</style>
