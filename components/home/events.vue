<template lang="html">
  <div id="events" class="padding" ref="events" data-scroll-section>
    <div class="content">

      <div class="box title-1" data-scroll data-scroll-speed="-.5">
        <v-text :text="data.title" class="title big" :play="animateTitle" />
      </div>

      <div class="box image-1" data-scroll data-scroll-speed="-.5">
        <v-image :image="data.image1" />
      </div>

      <div class="box image-2" data-scroll data-scroll-speed=".5">
        <v-image :image="data.image2"/>
      </div>

      <div class="box image-3" data-scroll data-scroll-speed=".25">
        <v-image :image="data.image3"/>
      </div>

    </div>
  </div>
</template>

<script>
import vBox from '@/components/common/box'
import vText from '@/components/common/text'
import vImage from '@/components/common/image'
export default {
  props:['data'],
  components:{vBox,vText,vImage},
  data(){
    return{
      animateTitle: false
    }
  },
  mounted(){
    let scene = new this.$scrollBuddy.scene({
      el: this.$refs.events
    })

    scene.onExit((e)=> {
      if (e === 'before') this.animateTitle = false
    })
    scene.onEnter(()=>this.animateTitle = true)
  },
}
</script>

<style lang="scss">
#events{
  height: 130vw;
}

#events .content{
  position: relative;
  height: 100%;
}

#events .box{
  position: absolute;
}

#events .title-1{
  top: 36vw;
  right:0px;
  z-index: 1
}

#events .image-1{
  top: 20vw;
  left: 0px;
  width: 45vw;
  height: 60vw
}

#events .image-2{
  top: 2vw;
  right: 2vw;
  width:25vw;
  height: 30vw
}

#events .image-3{
  top: 67vw;
  right: 0px;
  width: 30vw;
  height: 30vw
}

@media screen and (max-width: $mobile){
  #events{
    height: auto;
    padding: 0px;
  }

  #events .box{
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    height: 100vh;
    width: 100%;
  }
}
</style>
