<template lang="html">
  <gridBox :boxWidth="boxWidth" :index="index">
    <div :style="{ backgroundImage: `url(${image})`}" class="grid-image">
      <nuxt-link class="grid-image-link" :class="{fade}" :to="to">
        <slot/>
      </nuxt-link>
    </div>
  </gridBox>
</template>

<script>
import gridBox from '@/components/grid/gridBox'
export default {
  components: {
    gridBox
  },
  props: {
    image: String,
    to: String,
    boxWidth: String,
    fade: Boolean,
    index: { type: Number, default: -1 }
  }
}
</script>

<style lang="css">
  .grid-image-link{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px;
    text-align: center;
  }

  .grid-image{
    height: 100%;
    width: 100%;
    background-size: cover;
  }

  .grid-image-link.fade{
    opacity: 0;
    transition: opacity 1s
  }

  .grid-image-link.fade:hover{
    opacity: 1
  }

  @media screen and (max-width:850px){
    .grid-image-link.fade{
      opacity: 1;
    }
  }
</style>
