<template lang="html">
  <div id="comms" class="padding" ref="comms" data-scroll-section>
    <div class="content">
      <v-box
      class="comms-1"
      :data-scroll-offset="parallax ? '40%' : '100%'"
      data-scroll-call="commsTitle"
      data-scroll-delay="20"
      >
        <v-text :text="data.title" :play="playTitle" tag="h1" class="title" />
      </v-box>

      <v-box class="comms-2" :speed="parallax ? .5 : 0">
        <v-image :image="data.image1" />
      </v-box>

      <v-box class="comms-3" :speed="parallax ? .5 : 0">
        <v-image :image="data.image2" />
      </v-box>

      <v-box class="comms-4" :speed="parallax ? .25 : 0">
        <v-image :image="data.image3" />
      </v-box>
    </div>
  </div>
</template>

<script>
import vText from "@/components/common/text";
import vImage from "@/components/common/image";
import vBox from '@/components/common/box'
import {mapState} from 'vuex'
export default {
  props: ["data"],
  components: { vText, vImage,vBox },
  computed:mapState(['parallax']),
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

.comms-1 {
  top: 35vw;
  left: 0px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.comms-2 {
  top: 20vw;
  right: 0px;
  width: 45vw;
  height: 60vw;
}

.comms-3 {
  top: 2vw;
  left: 2vw;
  width: 25vw;
  height: 30vw;
}

.comms-4 {
  top: 67vw;
  left: 0px;
  width: 30vw;
  height: 30vw;
}


@media screen and (max-width: $mobile){
  #comms{
    height: auto;
    padding: 0px;
  }

}
</style>
