<template lang="html">
  <div class="section-title">
    <h1 ref="title" v-html="title"/>
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

  h1{
    @include headerFont;
    font-size: 80px;
    font-weight: 500;
    letter-spacing: -2px;
    line-height: 95%;
  }

  @media (max-width: $tablet){
    h1{
      font-size: 75px;
    }
  }

  @media (max-width: $mobile){
    h1{
      font-size: 60px;
    }
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
