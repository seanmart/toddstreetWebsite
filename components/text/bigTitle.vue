<template lang="html">
  <div class="big-title">
    <template v-for="line,i in text">
      <h1 v-if="i + 1 === move" v-scroll="props" v-html="line"/>
      <h1 v-else v-html="line"/>
    </template>
  </div>
</template>

<script>
export default {
  props:{
    text:{type:Array, default:()=>[]},
    move:{type:Number, default: 0}
  },
  computed:{
    props(){
      return{
        x:-1,
        onResize:(w)=> {
          if (w < this.$size.mobile){
            return {x:-.5}
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .big-title{
    @include font('giant');
  }
</style>
