<template lang="html">
  <img :class="{ready}" class="poster" v-if="image" :style="{backgroundImage:`url(${image})`}"/>
</template>

<script>
export default {
  props:{
    image: {type: String, default: null}
  },
  data(){
    return{
      ready: false
    }
  },
  mounted(){
    this.ready = true
  },
  watch:{
    ready(ready){
      this.$emit('ready', ready)
    },
  }
}
</script>

<style lang="scss">
.poster{
  opacity: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
  transition: opacity 1s;
  &.ready{
    opacity: 1;
  }
}
</style>
