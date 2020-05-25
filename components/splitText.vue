<template lang="html">
  <div class="split-text">
    <template v-for="(word, w) in items">

      <br v-if="!word" class="break" :key="w"/>

      <div v-else class="word" :key="w">

        <template v-if="Array.isArray(word)">

          <div class="letter" v-for="(letter,l) in word">
            <span v-html="letter" :key="l"/>
          </div>

        </template>

        <span v-else v-html="word"/>

      </div>

    </template>
  </div>
</template>

<script>
export default {
  props:{
    text: {type: String, default: ''},
    right: Boolean,
    letters: Boolean
  },
  computed:{
    wordSplit(){
      return this.text.split(' ').map(w => {
        return w == '<br/>' ? null : this.right ? ` ${w}`: `${w} `
      })
    },
    letterSplit(){
      return this.wordSplit.map(w => {
        if (!w) return null
        return w.split('')
      })
    },
    items(){
      if (this.letters) return this.letterSplit.map(w => w ? w.map(l => l.replace(' ', '&nbsp')) : null)
      return this.wordSplit.map(w => w ? w.replace(' ','&nbsp') : null)
    }
  }
}
</script>

<style lang="scss">
.split-text{
  .word,.letter, span{
    display: inline-block;
  }
}
</style>
