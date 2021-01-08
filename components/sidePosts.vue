<template lang="html">
  <div class="posts">
    <div class="post" v-for="post,i in posts" @click="$emit('clicked',{post:post,index:i})">
      <h1 v-html="post.title" class="h5"/>
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
    cursor: pointer;
    flex: 1 0 70px;
    padding: 20px 0px;
    border-top: 1px solid $lightBlue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background .25s;

    &:last-child{
      border-bottom: 1px solid $lightBlue;
    }
    &:hover{
      background: rgba(255,255,255,.01);
      h1{
        transform: translateX(20px);
      }
    }

    h1{
      font-weight: 400;
      white-space: nowrap;
      transition: transform .25s;
    }
  }
}
</style>
