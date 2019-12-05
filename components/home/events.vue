<template lang="html">
  <div id="events" class="padding" ref="events" data-scroll-section>
    <div class="content">
      <div class="box title-1" data-scroll :data-scroll-speed="mobile ? 0 : -.5">
        <v-text :text="data.title" class="title big" play />
      </div>

      <div class="box image-1" data-scroll :data-scroll-speed="mobile ? 0 : -.5">
        <v-image :image="data.image1" />
      </div>

      <div class="box image-2" data-scroll :data-scroll-speed="mobile ? 0 : .5">
        <v-image :image="data.image2" />
      </div>

      <div class="box image-3" data-scroll :data-scroll-speed="mobile ? 0 : .25">
        <v-image :image="data.image3" />
      </div>
    </div>
  </div>
</template>

<script>
import vText from "@/components/common/text";
import vImage from "@/components/common/image";
export default {
  props: ["data"],
  components: { vText, vImage },
  computed:{
    mobile(){
      return this.$store.state.mode === 'mobile'
    }
  }
};
</script>

<style lang="scss">
#events {
  height: 130vw;
}

#events .content {
  position: relative;
  height: 100%;
}

#events .box {
  position: absolute;
}

#events .title-1 {
  top: 35vw;
  right: 0px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

#events .image-1 {
  top: 20vw;
  left: 0px;
  width: 45vw;
  height: 60vw;
}

#events .image-2 {
  top: 2vw;
  right: 2vw;
  width: 25vw;
  height: 30vw;
}

#events .image-3 {
  top: 67vw;
  right: 0px;
  width: 30vw;
  height: 30vw;
}

@media screen and (max-width: $mobile){

  #events {
    height: auto;
    padding: 0px;
  }

  #events .box {
    position: relative;
    height: 100vh;
    width: 100%;
    top: auto;
    left: auto;
    right: auto;
    width: auto;
  }

  #events .title-1{
    height: 75vh;
  }
}
</style>
