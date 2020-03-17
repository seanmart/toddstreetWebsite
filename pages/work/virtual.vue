<template lang="html">
  <div class="virtual" v-scroll:section>
    <div class="intro">
      <big-title :title="info.title"/>
    </div>
  </div>
</template>

<script>
import bigTitle from '@/components/caseStudy/title'
export default {
  components:{bigTitle},
  data(){
    return{
      info:{
        overview: 1,
        title: 'Virtual Meetings',
        image: '/broadcast/broadcast1.jpg'
      }
    }
  }
}
</script>

<style lang="scss">
.virtual{
  .intro{
    min-height: 100vh;
    @include sitePadding();
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
