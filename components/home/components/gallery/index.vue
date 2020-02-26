<template lang="html">
  <div class="gallery-section">
    <template v-for="(image,i) in images" >
      <gallery-item :key="i" :image="image" :index="i + 1" />
    </template>
  </div>
</template>

<script>
import galleryItem from './galleryItem'
export default {
  components:{galleryItem},
  props:{
    images:{type: Array, default: ()=>[]}
  },
}
</script>

<style lang="scss">
.gallery-section{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0px $unit;

  @media (max-width:$tablet){
    padding: $unit-tablet;
  }
  @media (max-width: $mobile){
    padding: $unit-mobile
  }
}
</style>
