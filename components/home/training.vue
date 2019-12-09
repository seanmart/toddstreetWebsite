<template lang="html">
  <div id="training" class="padding" ref="training" data-scroll-section>
    <div class="content">
      <v-box class="training-1"
        :data-scroll-offset="disableParallax ? '100%' : '40%'"
        data-scroll-call="trainingTitle"
        data-scroll-delay="1"
      >
        <v-text :text="data.title" :play="playTitle" tag="h1" class="title" />
      </v-box>

      <v-box class="training-2" :speed="disableParallax ? 0 : .5">
        <v-image :image="data.image1" />
      </v-box>

      <v-box class="training-3" :speed="disableParallax ? 0 : .5">
        <v-image :image="data.image2" />
      </v-box>

      <v-box class="training-4" :speed="disableParallax ? 0 : .25">
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
  computed:mapState(['disableParallax']),
  data(){
    return{
      playTitle: false
    }
  },
  mounted(){
    this.$loco.call((e)=>{
      if (e === 'trainingTitle'){
        this.playTitle = true
      }
    })
  }
};
</script>

<style lang="scss">
#training {
  height: 120vw;
  padding: $padding;
}

#training .content {
  position: relative;
  height: 100%;
  width: 100%;
}

.training-1 {
  top: 35vw;
  right: 0px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.training-2 {
  top: 20vw;
  left: 0px;
  width: 45vw;
  height: 60vw;
}

.training-3 {
  top: 2vw;
  right: 2vw;
  width: 25vw;
  height: 30vw;
}

.training-4 {
  top: 67vw;
  right: 0px;
  width: 30vw;
  height: 30vw;
}

@media screen and (max-width: $mobile){
  #training{
    height: auto;
    padding: 0px;
  }

}
</style>
