<template lang="html">
  <div class="section-title">
    <h1 ref="title" class="header--bg" v-html="title"/>
    <hr ref="rule"/>
  </div>
</template>

<script>
export default {
  props:{
    title: {type:String,default:''}
  }
}
</script>

<style lang="scss">
.section-title{
  position: relative;
  padding-left: $col2;

  hr{
    background: #1E0FC7;
    border: none;
    position: absolute;
    width: $gutter;
    margin: 0px;
    top: 10px;
    bottom: 10px;
    left: 0px;
  }

}

.right .section-title{
  padding-left: 0px;
  padding-right: $col2;
  text-align: right;
  hr{
    left: auto;
    right: 0px;
  }
}
</style>
