<template lang="html">
  <div ref="el" class="card">
    <nuxt-link v-if="link" :to="link">
      <h1 v-if="title">{{title}}</h1>
      <inner-parallax-image v-if="image" :image="image" class="image"/>
    </nuxt-link>
  </div>
</template>

<script>
import innerParallaxImage from '@/components/image/innerParallax'
import circleButton from '@/components/text/circle'

export default {
  components:{innerParallaxImage,circleButton},
  props:{
    type: {type: String, default: null},
    title: {type: String, default: null},
    link: {type: String, default: null},
    image: {type: String, default: null},
  }
}
</script>

<style lang="scss">

$previewTransition: .25s;

.card{
  overflow: hidden;
  color: $snow;
  background: $midnight;
  cursor: pointer;
  position: relative;

  a{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  h1{
    @include font('header small');
    transform: translateY(40%);
    opacity: 0;
    transition: opacity $previewTransition / 2, transform $previewTransition;
  }

  .image{
    z-index: 0;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    transition: opacity $previewTransition;
  }

  &:hover{
    h1{
      transform: translateY(0);
      opacity: 1;
    }
    .image{
      opacity: .1;
    }
  }
}
</style>
