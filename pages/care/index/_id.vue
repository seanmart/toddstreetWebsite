<template lang="html">
  <div id="article" v-if="post">
    <img v-if="post.image" :src="'/' + post.image" class="margin--b" v-enter:zoomout/>
    <div v-if="post.html" class="body body--font" v-html="post.html"/>
  </div>
</template>

<script>
export default {
  props:{
    post:{type: Object, default:()=>({})}
  }
}
</script>

<style lang="scss">
#article{

  img{
    width: 100%;
  }

  p{
    font-size: 20px;
    line-height: 150%;
    margin-bottom: 20px;
  }

  a{
    font-weight: 700;
    color: $lightBlue;
  }
}
</style>
