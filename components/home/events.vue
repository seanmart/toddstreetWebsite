<template lang="html">
  <div id="events" class="padding" ref="events" data-scroll-section>
    <div class="content">
      <div class="box events-1"
        data-scroll
        :data-scroll-offset="parallax ? '40%' : '100%'"
        data-scroll-call="eventsTitle"
        data-scroll-delay="1"
      >
        <v-text :text="data.title" :play="playTitle" tag="h1" class="title" />
      </div>

      <div class="box events-2" data-scroll :data-scroll-speed="parallax ? 2 : 0">
        <v-image :image="data.image1" />
      </div>

      <div class="box events-3" data-scroll :data-scroll-speed="parallax ? .5 : 0">
        <v-image :image="data.image2" />
      </div>

      <div class="box events-4" data-scroll :data-scroll-speed="parallax ? .25 : 0">
        <v-image :image="data.image3" />
      </div>
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
      if (e === 'eventsTitle'){
        this.playTitle = true
      }
    })
  }
};
</script>

<style lang="scss">
#events {
  height: 120vw;
  padding: $padding;
}

#events .content {
  position: relative;
  height: 100%;
  width: 100%;
}

.events-1 {
  top: 35vw;
  right: 0px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.events-2 {
  top: 20vw;
  left: 1vw;
  width: 45vw;
  height: 60vw;
}

.events-3 {
  top: 2vw;
  right: 2vw;
  width: 25vw;
  height: 30vw;
}

.events-4 {
  top: 67vw;
  right: 0px;
  width: 30vw;
  height: 30vw;
}

@media screen and (max-width: $mobile){
  #events{
    padding: 0px;
    height: auto;
  }

}
</style>
