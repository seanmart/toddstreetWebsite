<template lang="html">
  <div id="events" ref="events" data-scroll-section>
    <div class="content">

      <v-box :styles="{top: '36vw',right:'0px',zIndex: 1}" speed="-.5">
        <v-text :text="data.title" class="title big" :play="animateTitle"/>
      </v-box>

      <v-box :styles="{top: '20vw',left: '0px',width: '45vw',height: '60vw'}" speed="-.5">
        <v-image :image="data.image1"/>
      </v-box>

      <v-box :styles="{top: '2vw',right: '2vw',width: '25vw',height: '30vw'}" speed=".5">
        <v-image :image="data.image2"/>
      </v-box>

      <v-box :styles="{top: '67vw',right: '0px',width: '30vw',height: '30vw'}" speed=".25">
        <v-image :image="data.image3"/>
      </v-box>

      <v-box :styles="{top: '90vw',left: '10vw',zIndex: 1}" speed=".5">
        description
      </v-box>

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
  padding: 0px $padding
}

#events .content{
  position: relative;
  height: 100%;
}

.mobile #events{
  height: auto;
  padding: 0px;
}
</style>
