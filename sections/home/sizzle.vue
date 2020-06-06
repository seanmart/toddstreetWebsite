<template lang="html">
  <section id="sizzle" v-section>
    <video-player :videoId="data.videoId" v-enter:slideup/>
  </section>
</template>

<script>
import videoPlayer from '@/components/videoPlayer'
export default {
  components:{videoPlayer},
  props:['data']
}
</script>

<style lang="scss">
@media (max-width: $tablet){
#sizzle{
    padding:0px;
  }
}

</style>
