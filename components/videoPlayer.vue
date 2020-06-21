<template lang="html">
  <div class="video-player">
    <div class="video"/>

    <cursor-zone class="video-cursor-zone">
      <div class="button link--font link--sm" ref="button">
        play
      </div>
    </cursor-zone>

  </div>
</template>

<script>
import cursorZone from '@/components/cursorZone'
export default {
  components:{cursorZone}
}
</script>

<style lang="scss">
.video-player{
  position: relative;
  overflow: hidden;
  .video{
    width: 100%;
    padding-bottom: 56.25%;
    background: black;
  }

  .video-cursor-zone{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button{
    height: 100px;
    width: 100px;
    background: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0px;
    cursor: pointer;
  }
}
</style>
