<template lang="html">
  <div id="events" class="padding" ref="events" data-scroll-section>
    <div class="content">
      <div class="box title-1"
        data-scroll
        data-scroll-offset="75%"
        data-scroll-call="eventsTitle"
        data-scroll-delay="1"
      >
        <v-text :text="data.title" :play="playTitle" tag="h1" class="title" />
      </div>

      <div class="box image-1" data-scroll :data-scroll-speed="disableParallax ? 0 : .5">
        <v-image :image="data.image1" />
      </div>

      <div class="box image-2" data-scroll :data-scroll-speed="disableParallax ? 0 : .5">
        <v-image :image="data.image2" />
      </div>

      <div class="box image-3" data-scroll :data-scroll-speed="disableParallax ? 0 : .25">
        <v-image :image="data.image3" />
      </div>
    </div>
  </div>
</template>

<script>
import vText from "@/components/common/text";
import vImage from "@/components/common/image";
import {mapState} from 'vuex'
export default {
  props: ["data"],
  components: { vText, vImage },
  computed:mapState(['disableParallax']),
  data(){
    return{
      playTitle: false
    }
  },
  mounted(){
    this.$loco.call((e)=>{
      if (e === 'eventsTitle'){
        console.log('play')
        this.playTitle = true
      }
    })
  }
};
</script>

<style lang="scss">
#events {
  height: 130vw;
  padding: $padding;
}

#events .content {
  position: relative;
  height: 100%;
  width: 100%;
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

#events .title-1 h1{
  font-size: 8vw;
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

@media screen and (max-width: $tablet){
  #events {
    height: auto;
  }

  #events .title-1 h1{
    font-size: 40px;
  }

  #events .content{
    display: flex;
    flex-wrap: wrap;
  }

  #events .box {
    padding: 20px;
    flex: 0 0 50%;
    position: relative;
    height: 50vh;
    width: auto;
    min-height: 400px;
    top: auto;
    left: auto;
    right: auto;
  }
}

@media screen and (max-width: $mobile){
  #events{
    padding: 0px;
  }

  #events .box {
    height: 80vh;
    flex: 0 0 100%;
    padding: 0px;
  }

  #events .title-1{
    height: 50vh;
  }

}
</style>
