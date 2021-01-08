<template lang="html">
<section id="cares" class="space" data-color-container>
  <split-text :text="data.title" class="space-b" textClass="h1 contain" v-enter:splitTextUp="{offset: '5vw'}"/>
  <div class="content">
    <div class="main">

        <div class="image">
          <transition name="care-image">
            <div :key="index" class="inner-image" v-image:top="care[index].image"/>
          </transition>
        </div>

      <h1 :key="index" v-html="care[index].title" class="h3 title"/>
      <p class="p5" v-if="care[index].preview" v-html="care[index].preview + '...'"/>

      <button
        class="h6 caps button knockout cares-button"
        v-html="'keep reading'"
      />

    </div>
    <div class="side">
      <h3 class="label">Most Recent</h3>
      <side-posts :posts="care.slice(0,10)" @clicked="index = $event.index"/>
    </div>
  </div>
</section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:['data'],
  data:()=>({index:0}),
  computed: mapState(['care']),
}
</script>

<style lang="scss">
#cares{
  background: $storm;
  color: white;

  .care-image-leave-active,
  .care-image-enter-active
  {
    transition: .5s;
  }

  .care-image-enter,
  .care-image-leave-to{
    opacity: 0;
  }

  .care-image-enter-to,
  .care-image-leave{
    opacity: 1;
  }

  .content{
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  .main{
    flex: 1 1 auto;
    position: relative;
    margin-right: 100px;
  }

  .side{
    flex: 0 0 300px;

    .label{
      margin-bottom: 50px;
      padding: 0px;
    }

    .post{
      border-color: rgba(255,255,255,.1)
    }
  }

  .cares-button{
    display: block;
    margin-top: 30px;
  }

  .image, .title{
    margin-bottom: 50px;
    position: relative;
  }

  .image{
    padding-bottom: 56.25%;
    background: $midnight;
  }

  .inner-image{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }

  @media (max-width: $mobile){
    .content{
      flex-direction: column;
    }

    .main{
      flex: 0 0 auto;
      margin: 0px;
    }

    .side{
      margin-top: 100px;
      flex: 0 0 auto;
    }

  }
}
</style>
