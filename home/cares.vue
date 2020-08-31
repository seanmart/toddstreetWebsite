<template lang="html">
<section id="cares" class="space" data-color-container>
  <split-text :text="data.title" class="space-b" textClass="h1 contain" v-enter:splitTextUp="{offset: '5vw'}"/>
  <div class="content">
    <div class="main">
      <div class="image" v-image="care[0].image"/>
      <h1 v-html="care[0].title" class="h3 title"/>
      <p class="p5 body" v-html="care[0].body.split('.')[0] + '...'"/>
    </div>
    <div class="side">
      <side-posts :posts="care.slice(1,5)"/>
    </div>
  </div>
</section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:['data'],
  computed: mapState(['care'])
}
</script>

<style lang="scss">
#cares{
  background: $storm;
  color: white;

  .content{
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }

  .main{
    flex: 1 1 auto;
    position: relative;
    padding-right: 100px;

    .title, .body{
      margin-top: 50px;
    }
  }

  .side{
    flex: 0 0 300px;

    .post{
      border-color: rgba(255,255,255,.1)
    }
  }

  .image{
    padding-bottom: 56.25%;
    background: #ccc;
  }
}
</style>
