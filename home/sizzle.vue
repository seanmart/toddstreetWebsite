<template lang="html">
  <section id="sizzle" class="space-t space-b">
    <div class="content" @click="play = !play" data-button-color="#fff">
      <video-player :videoId="data.videoId" :play="play"/>
      <cursor-zone :hideOnStop="play">
        <circle-button class="sizzle-button h5">{{play ? 'pause' : 'play'}}</circle-button>
      </cursor-zone>
    </div>
  </section>
</template>

<script>

export default {
  props:['data'],
  data:()=>({
    play: false
  })
}
</script>

<style lang="scss">
#sizzle{
  position: relative;
  .content{
    position: relative;
  }
  .cursor-zone{
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
  }
  .sizzle-button{
    width: 100px;
  }
}
</style>
