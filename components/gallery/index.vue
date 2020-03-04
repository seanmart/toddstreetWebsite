<template lang="html">
  <div class="gallery">
    <template v-for="(image,i) in images">

      <galleryImage
        :parallax="shouldParallax(i) ? 2 : 0"
        :image="image"
        :key="i"
        :class="`image-${imageIndex(i)}`"
      />

    </template>
  </div>
</template>

<script>
import galleryImage from './galleryImage'
export default {
  components:{galleryImage},
  props:{
    images:{type: Array, default:()=>[]}
  },
  methods:{
    imageIndex(i){
      return i % 8 + 1
    },
    shouldParallax(i){
      return [2,3,5,8].indexOf(this.imageIndex(i)) > -1
    }
  }
}
</script>

<style lang="scss" >
.gallery{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 0px -10px;

  .gallery-image{
    flex: 0 0 auto;
    width: 33.333%;
    padding: 10px;

    &.image-1{
      width: 66.666%;
    }

    &.image-2 .height-container{
      padding-bottom: 50%;
    }

    &.image-3 .height-container{
      padding-bottom: 50%;
    }

    &.image-4{
      margin-right: 33.333%;
    }

    &.image-5 .height-container{
      padding-bottom: 50%;
    }

    &.image-6{
      width: 66.666%;
    }

    &.image-7{
      margin-left: 33.333%;
    }

    &.image-8 .height-container{
      padding-bottom: 50%;
    }
  }
}
</style>
