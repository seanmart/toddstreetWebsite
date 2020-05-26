<template lang="html">
  <div class="video-player">
    <div class="video"/>

    <div
      class="button-area"
      ref="buttonArea"
    />

    <div class="button-container" ref="buttonContainer">
      <div class="button" ref="button">
        <h3>{{status}}</h3>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      status: 'Play'
    }
  },
  methods:{

  }
}
</script>

<style lang="scss">
  .video-player{
    position: relative;
    overflow: hidden;

    .video{
      width: 100%;
      padding-bottom: 56.25%;
      background: #ddd;
    }

    .button-area{
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      z-index: 1;
    }

    .button-container{
      position: absolute;
      top: 0px;
      left: 0px;

      .button{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: white;
        text-transform: uppercase;
        opacity: 0;
        transform:scale(0);
      }
    }
  }
</style>
