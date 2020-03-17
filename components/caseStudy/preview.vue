<template lang="html">
  <div class="case-study-item">
    <div class="content">
      <h3 v-if="type">{{type}}</h3>
      <h1 v-if="title">{{title}}</h1>
      <nuxt-link v-if="link" :to="link">view</nuxt-link>
    </div>
    <div class="color" :style="{background: color}"/>
    <inner-parallax-image v-if="image" :image="image" class="image"/>
  </div>
</template>

<script>
import innerParallaxImage from '@/components/image/innerParallax'
export default {
  components:{innerParallaxImage},
  props:{
    type: {type: String, default: null},
    title: {type: String, default: null},
    link: {type: String, default: null},
    color: {type: String, default: '#000'},
    image: {type: String, default: null}
  }
}
</script>

<style lang="scss">
.case-study-item{
  position: relative;
  display: flex;
  background: #eee;
  overflow: hidden;
  color: white;
  z-index: 3;

  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: left;
    opacity: 0;
    transition: opacity .5s;
    height: 100%;
    width: 100%;
    padding:5%;

    h3{
      @include font('header small');
      margin-bottom: 1.5vw;
    }

    h1{
      @include font('header');
      opacity: 0;
      transform: translateY(100%);
      transition: opacity .5s, transform .75s;
    }

    a{
      @include font('body');
      display: inline-block;
      margin-top: 2vw;
      padding: .5vw 1.2vw;
      border: 2px solid white;
      border-radius: .3vw;
      transition: transform .5s;
      transform: scale3d(0,0,1)
    }
  }

  .image{
    z-index: -2;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    transition: transform .5s;
  }

  .color{
    z-index: -1;
    opacity: 0;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    transition: opacity .5s;
  }

  &:hover{
    .content{
      opacity: 1;

      h1{
        opacity: 1;
        transform: translateY(0);
      }

      a{
        transform: scale3d(1,1,1);
        transition-delay: .25s;
      }
    }
    .color{
      opacity: .7;
    }
  }
}
</style>
