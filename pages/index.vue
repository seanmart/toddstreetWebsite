<template lang="html">
  <div id="home">
    <section class="intro" v-scroll:section>
      <div class="container">
        <div class="content">
          <div class="video">
            video
          </div>
        </div>
      </div>
    </section>
    <section class="events" v-scroll:section>
      <div class="container">

      </div>
    </section>
    <section class="comms" v-scroll:section>
      <div class="container">

      </div>
    </section>
    <section class="training" v-scroll:section>
      <div class="container">

      </div>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#home{

  .intro{

    .video{
      width: $unit * 7;
      height: $unit * 4;
      background: black;
      position: absolute;
      top: 0px;
      right: 0px;
    }

  }
}
</style>
