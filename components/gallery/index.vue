<template lang="html">
  <galleryContainer :count="imgs.length" :duration="6">
    <template slot-scope="{index, dir, set}">
      <galleryImage :image="imgs[index]" :index="index" :dir="dir" slide/>
      <galleryDots v-if="dots" :count="imgs.length" :index="index" @set="set($event)"/>
    </template>
  </galleryContainer>
</template>

<script>
import galleryContainer from '@/components/gallery/galleryContainer'
import galleryImage from '@/components/gallery/galleryImage'
import galleryDots from '@/components/gallery/galleryDots'
export default {
  components: {
    galleryContainer,
    galleryImage,
    galleryDots
  },
  props: {
    images: [Array, String],
    folder: String,
    dots: { type: Boolean, default: false },
    height: { type: String, default: '56.25vw' }
  },
  computed: {
    imgs() {
      let arr =
        typeof this.images === 'string' ? this.images.split(', ') : this.images
      return this.folder ? arr.map(img => `${this.folder}/${img}`) : arr
    }
  }
}
</script>

<style lang="css">
</style>
