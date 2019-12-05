<template lang="html">
  <div id="comms" class="padding" ref="comms" data-scroll-section>
    <div class="content">
      <div class="box title-1"
        data-scroll
        :data-scroll-offset="disableParallax ? '100%' : '20%'"
        data-scroll-call="commsTitle"
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
      if (e === 'commsTitle'){
        this.playTitle = true
      }
    })
  }
};
</script>

<style lang="scss">
#comms {
  height: 120vw;
  padding: $padding;
}

#comms .content {
  position: relative;
  height: 100%;
  width: 100%;
}

#comms .box {
  position: absolute;
}

#comms .title-1 {
  top: 35vw;
  left: 0px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

#comms .title-1 h1{
  font-size: 8vw;
}

#comms .image-1 {
  top: 20vw;
  right: 0px;
  width: 45vw;
  height: 60vw;
}

#comms .image-2 {
  top: 2vw;
  left: 2vw;
  width: 25vw;
  height: 30vw;
}

#comms .image-3 {
  top: 67vw;
  left: 0px;
  width: 30vw;
  height: 30vw;
}

@media screen and (max-width: $tablet){
  #comms {
    height: auto;
  }

  #comms .title-1 h1{
    font-size: 40px;
  }

  #comms .content{
    display: flex;
    flex-wrap: wrap;
  }

  #comms .box {
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
  #comms{
    padding: 0px;
  }

  #comms .box {
    height: 80vh;
    flex: 0 0 100%;
    padding: 0px;
  }

}
</style>
