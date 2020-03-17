<template lang="html">
  <div class="title" v-if="title">
    <h1 v-for="line in lines">{{line}}</h1>
  </div>
</template>

<script>
export default {
  props:{
    title: {type: String, default: null}
  },
  computed:{
    lines(){
      return this.title.split(' ')
    }
  }
}
</script>

<style lang="scss">
  .title{
    @include font('header big');
    text-transform: uppercase;
  }
</style>
