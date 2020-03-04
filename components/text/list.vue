<template lang="html">
  <div class="list">
    <h3 class="list-header" v-if="header" v-html="header"/>
    <div class="list-item" v-for="(item,i) in list" :key="i">
      <div class="list-line" v-if="i === 0"/>
      <div class="list-text-container">
        <p class="list-text" v-html="item"/>
      </div>
      <div class="list-line"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    header: {type: String, default: null},
    list:{type: Array, default: ()=>[]},
  }
}
</script>

<style lang="scss">
.list{

  .list-header{
    margin-bottom: 2vw;
  }

  .list-text-container{
    overflow: hidden;
  }

  .list-text{
    padding: .75vw 0px;
    display: inline-block;
  }

  .list-line{
    border-top: 1px solid $midnight;
  }
}
</style>
