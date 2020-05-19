<template lang="html">
  <main ref="page" :class="{hide: !init}">
    <navigation :init="init"/>
    <slot/>
  </main>
</template>

<script>
import navigation from './navigation'
export default {
  components:{navigation},
  created(){
    if(process.client) this.$vb.init()
  },
  data(){
    return{
      init: false
    }
  },
  mounted(){
    this.$vb.addPage(this.$refs.page)
    setTimeout(()=> {
      this.$vb.start()
      this.init = true
    }, 250)
  },
  watch:{
    init(){
      this.$emit('init')
    }
  }
}
</script>

<style lang="scss">
  main{
    transition: opacity .25s;
    &.hide{
      opacity: 0
    }
  }
</style>
