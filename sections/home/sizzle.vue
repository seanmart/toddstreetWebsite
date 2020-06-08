<template lang="html">
  <section id="sizzle">
    <video-player :videoId="data.videoId"/>
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
    padding-left: 0px;
    padding-right: 0px;
  }
}

</style>
