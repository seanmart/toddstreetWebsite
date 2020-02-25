<template lang="html">
  <div class="gallery-section" v-scroll="{onLeaveTop}">
    <template v-for="(image,i) in images" >
      <gallery-item :key="i" :image="image" :index="i + 1" :hide="triggerHide"/>
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
  data(){
    return{
      triggerHide: null
    }
  },
  methods:{
    onLeaveTop(){
      this.triggerHide = Date.now()
    }
  }
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
    padding: $unit-tablet / 4 * 3;
  }
  @media (max-width: $mobile){

  }
}
</style>
