<template lang="html">
  <div class="case-study" ref="caseStudy">

    <div class="background-container">
      <div class="content">
        <slot/>
      </div>
    </div>

    <div class="text-container">
      <div class="content">
        <h3 class="title--font title--md" v-html="title"/>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props:['title'],
  mounted(){


  }
}
</script>

<style lang="scss">
  .case-study{
    padding-bottom: 50%;
    background: #999;
    position: relative;
    overflow: hidden;

    .background-container{
      position: absolute;
      top:0px;
      right: 0px;
      left: 0px;
      bottom: 0px;
      z-index: 0;
    }

    .text-container{
      position: absolute;
      top:0px;
      right: 0px;
      left: 0px;
      bottom: 0px;
      padding: 30px;
      z-index: 1;
    }

    .content{
      position: relative;
      height: 100%;
    }

    h3{
      color: white;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 1;
      font-size: 40px;
    }

    @media (max-width: $tablet){
      padding-bottom: 70%;
    }

    @media (max-width: $mobile){
      padding-bottom: 0%;
      height: 600px;
    }

  }
</style>
