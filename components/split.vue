<template lang="html">
  <div class="split">
    <template v-for="(word,i) in words">
      <br v-if="!word" :key="i"/>
      <div v-else class="word" :key="i" v-html="word"/>
    </template>
  </div>
</template>

<script>
export default {
  props:{
    text: {type: String, default: ''},
    tag: {type: String, default: 'p'},
    textClass: {type: String, default: ''}
  },
  computed:{
    words(){
      return this.text.split(' ').map(w => {
        return w !== '<br/>' ? `<${this.tag} class="${this.textClass}">${w}&nbsp</${this.tag}>` : null
      })
    }
  }
}
</script>

<style lang="scss">
.split{
  .word{
    display: inline-block;
  }
}
</style>
