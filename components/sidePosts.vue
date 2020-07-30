<template lang="html">
  <div class="posts">
    <div class="post" v-for="post,i in posts">
      <h1 v-html="post.title" class="h4"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    posts:{type: Array, deafult: ()=>([])}
  },
}
</script>

<style lang="scss">
.posts{
  display: flex;
  flex-direction: column;

  .post{
    flex: 1 0 150px;
    padding: 30px 0px;
    border-top: 1px solid $lightBlue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:last-child{
      border-bottom: 1px solid $lightBlue;
    }

    h1{
      font-weight: 300;
    }
  }
}
</style>
