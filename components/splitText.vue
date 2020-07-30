<template lang="html">
  <div class="split-text">
      <div class="word" v-for="word,i in split">
        <span :key="i" v-html="word" :class="textClass"/>
      </div>
  </div>
</template>

<script>
export default {
  props:{
    text: String,
    textClass: String
  },
  computed:{
    split(){
      return this.text.replace(/\s+/g,' ').trim().split(' ').map(w =>  `${w}&nbsp`)
    }
  }
}
</script>

<style lang="scss">
.split-text{
  .word{
    display: inline-block;
    overflow: hidden;

    span{
      display: inline-block;
    }
  }
}
</style>
