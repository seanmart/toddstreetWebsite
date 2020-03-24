<template lang="html">
  <div class="incentive" v-scroll:page >
    <div class="intro" v-scroll:section>
      <big-title :title="info.title"/>
    </div>
    <div class="gallery" v-scroll:section>
      gallery items
    </div>
  </div>
</template>

<script>
import bigTitle from '@/components/work/title'
export default {
  components:{bigTitle},
  data(){
    return{
      info:{
        order: 5,
        title: 'Incentive Events',
        image: '/virtual/2.jpg'
      }
    }
  }
}
</script>

<style lang="scss">
.incentive{
  .intro{
    min-height: 100vh;
    @include sitePadding();
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .gallery{
    min-height: 100vh;
  }
}
</style>
