<template lang="html">
  <section id="events" v-scroll:section>
    <div class="content">
      <h1 ref="titleTop" class="title top" v-html="data.title[0]" v-scroll="{parallax:{speed:10,horizontal: true}}"/>
      <h1 ref="titleBottom" class="title bottom" v-html="data.title[1]" v-scroll="{parallax:{speed:20,horizontal: true}}"/>
      <parallax-image class="hero" :image="data.images.image1" :parallax="3"/>
    </div>
  </section>
</template>

<script>
import parallaxImage from "@/components/parallaxImage";
import reveal from "@/components/reveal";
export default {
  props: ["data"],
  components: { parallaxImage, reveal }
};
</script>

<style lang="scss">
#events {
  position: relative;
  overflow: hidden;
  width: 100vw;
  min-height: 100vw;

  .title{
    font-size: 12vw;
    position: absolute;
    white-space: nowrap;
    left: 50vw;

    &.top{
      top: 10vw;
    }

    &.bottom{
      top: 25vw;
      z-index: 1
    }

    @media (max-width: $mobile){
      font-size: 18vw;
      left: 30vw;

      &.top{
        top: 32vw;
      }

      &.bottom{
        top: 52vw;
        z-index: 1
      }
    }
  }

  .hero{
    position: absolute;
    top: 17vw;
    left: 10vw;
    width: 80vw;
    height: 50vw;

    @media (max-width: $mobile){
      top: 10vw;
      height: 80vw;
      z-index: -1
    }
  }
}
</style>
