<template lang="html">
  <div class="training" v-scroll:page >
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
        overview: 3,
        title: 'Training',
        image: '/experiential/1.jpg'
      }
    }
  }
}
</script>

<style lang="scss">
.training{
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
