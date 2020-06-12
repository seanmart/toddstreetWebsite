<template lang="html">
  <div class="card">
    <div v-if="image" class="image" v-image="image"/>
    <div class="text">
      <h1 v-if="title" v-html="title"/>
      <p v-if="body" v-html="body"/>
      <fancy-link v-if="link" :to="link"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    image:{type: String, default: null},
    title:{type: String, default: null},
    body:{type: String, default: null},
    link:{type: String, default: null}
  }
}
</script>

<style lang="scss">
.card{
  display: flex;
  flex-direction: column;

  .image{
    flex: 0 0 50%;
    background-size: cover;
    background-position:center center;
  }

  .text{
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
}
</style>
