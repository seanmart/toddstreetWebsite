<template lang="html">
  <section id="sizzle" class="space--all" data-section>
    <video-player v-enter:zoomout/>
  </section>
</template>

<script>
import videoPlayer from '@/components/videoPlayer'
export default {
  props:['data'],
  components:{videoPlayer}
}
</script>

<style lang="scss">
#sizzle{
  @media (max-width: $tablet){
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
