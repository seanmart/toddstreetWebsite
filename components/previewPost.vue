<template lang="html">
  <div class="preview-post">
    <div v-if="post.image" class="image" v-image="post.image"/>
    <h1 class="header--md" v-if="post.title" v-html="post.title"/>
    <p  class="body--sm" v-if="post.body" v-html="post.body.split(/\s+/).slice(0,40).join(' ') + '...'"/>
    <fancy-link v-if="post.link" :to="post.link">read more</fancy-link>
  </div>
</template>

<script>
export default {
  props:{
    post: {type: Object, default: ()=>({})},
    methods:{
      getBody(text){
        return text
      }
    }
  }
}
</script>

<style lang="scss">
.preview-post{

  .image{
    padding-bottom: 73.5%;
    background-size: cover;
    background-position:center center;
  }

  h1{
    margin: 40px 0px 20px;
  }

  p{
    margin: 0px;
  }

  a{
    margin-top: 40px;
  }
}
</style>
