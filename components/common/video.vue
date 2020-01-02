<template lang="html">
    <div
    :id="`video-${videoId}`"
    :class="`video wistia_embed wistia_async_${videoId}`"
    />
</template>

<script>
export default {
  props:{
    videoId: String
  },
  data(){
    return{

    }
  },
  mounted(){
    let video = `video-${this.videoId}`
    window.wistiaInitQueue = window.wistiaInitQueue || [];
    window.wistiaInitQueue.push(function(w) {

      w.options(video,{
        autoPlay: true,
        muted: true
      })
    });
  }
}
</script>

<style lang="css">
  .video{
    height: 600px;
    width: 800px;
  }
</style>
